import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    DeviceEventEmitter,
    RefreshControl,
    Text,
    View,
    ActivityIndicator,
    DeviceInfo,
    TouchableOpacity, InteractionManager
} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import actions from '../action/index'
import TrendingItem from '../common/TrendingItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import TrendingDialog, {TimeSpans} from '../common/TrendingDialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ArrayUtil from '../util/ArrayUtil'

const URL = 'https://github.com/trending/';
const pageSize = 10;
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
type Props = {};

export class TrendingPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            timeSpan: TimeSpans[0], // 默认选中今天
        };

        const {onLoadLanguageData} = this.props;
        onLoadLanguageData(FLAG_LANGUAGE.flag_language);
        this.preLanguages = [];

    }

    _genTabs() {
        const tabs = [];
        const {languages, theme} = this.props;
        this.preLanguages = languages;
        languages.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <TrendingTabPage {...props} tabLabel={item.name} timeSpan={this.state.timeSpan}
                                                      theme={theme}/>, // 如何在设置路由页面的同时传递参数, 非常有用!!
                    navigationOptions: {
                        title: item.name,
                    }
                }
            }
        });
        return tabs;
    }

    renderTitleView() {
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={() => {
                this.dialog.show()
            }} //
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: 'white', fontWeight: '400'}}>
                    趋势 {this.state.timeSpan.showText}
                </Text>
                <MaterialIcons
                    name={'arrow-drop-down'}
                    size={22}
                    style={{color: 'white'}}
                />
            </View>

        </TouchableOpacity>
    }

    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab); // 触发监听
    }

    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog} // 设置ref,方便调用组件内部的方法
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />
    }

    _tabNav() {
        const {languages, theme} = this.props;
        if (this.theme !== theme || !this.tabNav || !ArrayUtil.isEqual(this.preLanguages, languages)) {
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
                this._genTabs(), {
                    tabBarOptions: {
                        tabStyle: styles.tabStyle,
                        upperCaseLabel: false, // 是否支持标签大写,默认为true
                        scrollEnabled: true,  // 是否支持选项卡滚动,默认 false
                        style: {
                            backgroundColor: theme.themeColor, // Tabbar 背景颜色
                            height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                        },
                        indicatorStyle: styles.indicatorStyle, // 标签指示器样式
                        labelStyle: styles.labelStyle // 文字样式
                    },
                    lazy: true
                }
            ))
        }
        return this.tabNav;
    }

    render() {
        const {languages, theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={theme.styles.navBar}
        />;


        const TabNavigator = languages.length ? this._tabNav() : null;

        return (<View style={{flex: 1}}>
                {navigationBar}
                {TabNavigator && <TabNavigator/>}
                {this.renderTrendingDialog()}
            </View>

        );
    }
}

const mapTrendingStateToProps = state => ({
    languages: state.language.languages,
    theme: state.theme.theme,
});

const mapTrendingDispatchToProps = dispatch => ({
    onLoadLanguageData: (flagKey) => dispatch(actions.onLoadLanguageData(flagKey)),
});

export default connect(mapTrendingStateToProps, mapTrendingDispatchToProps)(TrendingPage);

class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel, timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
    }

    componentDidMount(): void {
        // InteractionManager.runAfterInteractions(()=>{
        //     this.loadData()
        // });
        this.loadData();
        // 添加监听
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan;
            this.loadData();
        });

        EventBus.getInstance().addListener(EventTypes.favorite_changed_trending, this.favoriteChangeListener = () => {
            this.isFavoriteChanged = true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = data => {
            if (data.to === 1 && this.isFavoriteChanged) {
                this.loadData(null, true);
            }
        })

    }

    componentWillUnmount(): void {
        // 移除监听
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove();
        }

        EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {trending} = this.props; // connect 之后产生的对象属性.
        let store = trending[this.storeName]; // 动态获取state, state就是oc中的model,数据对象
        if (!store) { // 初始化store,类似于oc中对 NSDictionary 的懒加载初始化
            store = {
                items: [], // 原始数据
                isLoading: false,   // 默认隐藏下拉刷新
                projectModels: [],  // 要显示的数据数组
                hideLoadingMore: true,  // 默认隐藏加载更多
            }
        }
        return store;
    }

    loadData(loadMore, refreshFavorite) {
        const {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} = this.props; // connect 之后产生的对象方法.
        const url = this.genFetchUrl(this.storeName);
        const store = this._store();
        console.log(store);
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {  //pageSize 设置为常量,防止修改
                this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            onFlushTrendingFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            onRefreshTrending(this.storeName, url, pageSize, favoriteDao); // pageSize 设置为常量,防止修改
        }
    }

    genFetchUrl(key) {
        return URL + key + '?' + this.timeSpan.searchText;
    }

    renderItem(data) {
        const {theme} = this.props;
        const item = data.item;
        return <TrendingItem
            theme={theme}
            projectModel={item}
            onSelect={
                (callback) => {
                    NavigationUtil.goPage({
                        theme,
                        projectModel: item,
                        flag: FLAG_STORAGE.flag_trending,
                        callback,
                    }, 'DetailPage')
                }

            }

            onFavorite={(item, isFavorite) => {
                FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)
            }}
        />
    }

    genIndicator() {
        const {theme} = this.props;
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{
                        color: 'red',
                        margin: 10
                    }}
                />
                <Text style={{color:theme.themeColor}}>正在加载更多</Text>
            </View>
    }

    render() {
        const {theme} = this.props;
        let store = this._store();
        return <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={(data) => this.renderItem(data)}
                keyExtractor={item => "" + item.item.fullName}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={theme.themeColor}
                        colors={[theme.themeColor]}
                        refreshing={store.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={theme.themeColor}
                    />
                }

                ListFooterComponent={() => this.genIndicator()}
                onEndReached={() => {
                    console.log('---onEndReached---');
                    setTimeout(() => {
                        if (this.canLoadMore) { //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                            this.loadData(true);
                            this.canLoadMore = false;
                        }
                    }, 100);
                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                    this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                    console.log('---onMomentumScrollBegin-----');
                }}
            />
            <Toast ref="toast"
                   position={'center'}
            />

        </View>;
    }

}

const mapStateToProps = state => ({
    trending: state.trending,
});

const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushTrendingFavorite: (storeName, pageIndex, pageSize, items) => dispatch(actions.onFlushTrendingFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
});

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    homePage: {
        justifyContent: 'center',
        fontSize: 20,
    },
    tabStyle: {
        // minWidth: 50, //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0,
    },
    indicatorStyle: {
        backgroundColor: 'white',
        height: 2,
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        height: 90,
        marginTop: 10,
    },
    indicatorContainer: {
        alignItems: 'center',
    }
});
