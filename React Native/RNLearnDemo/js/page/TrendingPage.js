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

const URL = 'https://github.com/trending/';
const THEME_COLOR = '#678';
const pageSize = 10;
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';

type Props = {};

export default class TrendingPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            timeSpan: TimeSpans[0], // 默认选中今天
        };
        this.tabNames = ['All', 'C', 'C++', 'Objective-c'];

    }

    _genTabs() {
        const tabs = [];
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item} timeSpan={this.state.timeSpan}/>, // 如何在设置路由页面的同时传递参数, 非常有用!!
                navigationOptions: {
                    title: item,
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
        if (!this.tabNav) {
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
                this._genTabs(), {
                    tabBarOptions: {
                        tabStyle: styles.tabStyle,
                        upperCaseLabel: false, // 是否支持标签大写,默认为true
                        scrollEnabled: true,  // 是否支持选项卡滚动,默认 false
                        style: {
                            backgroundColor: '#678', // Tabbar 背景颜色
                            height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                        },
                        indicatorStyle: styles.indicatorStyle, // 标签指示器样式
                        labelStyle: styles.labelStyle // 文字样式
                    }
                }
            ))
        }
        return this.tabNav;
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />;


        const TabNavigator = this._tabNav();

        return (<View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
                {navigationBar}
                <TabNavigator/>
                {this.renderTrendingDialog()}
            </View>

        );
    }
}

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
        })

    }

    componentWillUnmount(): void {
        // 移除监听
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove();
        }
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

    loadData(loadMore) {
        const {onRefreshTrending, onLoadMoreTrending} = this.props; // connect 之后产生的对象方法.
        const url = this.genFetchUrl(this.storeName);
        const store = this._store();
        console.log(store);
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {  //pageSize 设置为常量,防止修改
                this.refs.toast.show('没有更多了');
            })
        } else {
            onRefreshTrending(this.storeName, url, pageSize); // pageSize 设置为常量,防止修改
        }
    }

    genFetchUrl(key) {
        return URL + key + '?' + this.timeSpan.searchText;
    }

    renderItem(data) {
        const item = data.item;
        return <TrendingItem
            item={item}
            onSelect={
                () => {
                    NavigationUtil.goPage({
                        projectModel: item,
                    }, 'DetailPage')
                }

            }
        />
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
        let store = this._store();
        return <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={(data) => this.renderItem(data)}
                keyExtractor={item => "" + item.fullName}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={THEME_COLOR}
                        colors={[THEME_COLOR]}
                        refreshing={store.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={THEME_COLOR}
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
    onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack)),
});

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
