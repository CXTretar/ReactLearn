import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    View,
    DeviceInfo,
} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import TrendingItem from "../common/TrendingItem";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {PopularPage} from "./PopularPage";

type Props = {};

export class FavoritePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={theme.styles.navBar}
        />;

        const TabNavigator = createMaterialTopTabNavigator({
                'Popular': {
                    screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} theme={theme}/>,
                    navigationOptions: {
                        title: '最热',
                    }
                },
                'Trending': {
                    screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} theme={theme}/>,
                    navigationOptions: {
                        title: '趋势',
                    }
                },

            }, {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false, // 是否支持标签大写,默认为true
                    style: {
                        backgroundColor: theme.themeColor, // Tabbar 背景颜色
                        height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                    },
                    indicatorStyle: styles.indicatorStyle, // 标签指示器样式
                    labelStyle: styles.labelStyle // 文字样式
                }
            }
        );

        const TabNavigatorContainer = createAppContainer(TabNavigator);

        return (<View style={{flex: 1}}>
                {navigationBar}
                <TabNavigatorContainer/>
            </View>

        );
    }
}

const mapPopularStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapPopularStateToProps)(FavoritePage);

class FavoriteTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount(): void {
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
            if (data.to === 2) {
                this.loadData(false);
            }
        })
    }

    componentWillUnmount(): void {
        EventBus.getInstance().removeListener(this.listener);
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {favorite} = this.props; // connect 之后产生的对象属性.
        let store = favorite[this.storeName]; // 动态获取state, state就是oc中的model,数据对象
        if (!store) { // 初始化store,类似于oc中对 NSDictionary 的懒加载初始化
            store = {
                items: [], // 原始数据
                isLoading: false,   // 默认隐藏下拉刷新
                projectModels: [],  // 要显示的数据数组
            }
        }
        return store;
    }

    loadData(isShowLoading) {
        const {onLoadFavoriteData} = this.props; // connect 之后产生的对象方法.
        onLoadFavoriteData(this.storeName, isShowLoading);
    }

    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.storeName);
        if (this.storeName === FLAG_STORAGE.flag_popular) {
            EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
        } else {
            EventBus.getInstance().fireEvent(EventTypes.favorite_changed_trending);
        }

    }

    renderItem(data) {
        const {theme} = this.props;
        const item = data.item;
        const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
        return <Item
            theme={theme}
            projectModel={item}
            onSelect={
                (callback) => {
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: this.storeName,
                        callback,
                        theme,
                    }, 'DetailPage')
                }
            }

            onFavorite={(item, isFavorite) => {
                this.onFavorite(item, isFavorite);
            }}
        />
    }

    render() {
        const {theme} = this.props;
        let store = this._store();
        return <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={(data) => this.renderItem(data)}
                keyExtractor={item => "" + (item.item.id || item.item.fullName)}
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
            />
            <Toast ref="toast"
                   position={'center'}
            />

        </View>;
    }

}

const mapStateToProps = state => ({
    favorite: state.favorite,
});

const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (flag, isShowLoading) => dispatch(actions.onLoadFavoriteData(flag, isShowLoading)),
});

const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);

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
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
