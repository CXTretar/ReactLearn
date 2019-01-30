import React, {Component} from 'react';
import {FlatList, StyleSheet, Image, RefreshControl, Text, View, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const pageSize = 10;

type Props = {};

export default class PopularPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    _genTabs() {
        const tabs = [];
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                // screen: PopularTab,
                screen: props => <PopularTabPage {...props} tabLabel={item}/>, // 如何在设置路由页面的同时传递参数, 非常有用!!
                navigationOptions: {
                    title: item,
                }
            }
        });
        return tabs;
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />;

        const TabNavigator = createMaterialTopTabNavigator(
            this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false, // 是否支持标签大写,默认为true
                    scrollEnabled: true,  // 是否支持选项卡滚动,默认 false
                    style: {
                        backgroundColor: '#678', // Tabbar 背景颜色
                    },
                    indicatorStyle: styles.indicatorStyle, // 标签指示器样式
                    labelStyle: styles.labelStyle // 文字样式
                }
            }
        );

        const TabNavigatorContainer = createAppContainer(TabNavigator);

        return (<View style={{flex: 1, marginTop: 30}}>
                {navigationBar}
                <TabNavigatorContainer/>
            </View>

        );
    }
}

class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount(): void {
        this.loadData();
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {popular} = this.props; // connect 之后产生的对象属性.
        console.log(popular);
        let store = popular[this.storeName]; // 动态获取state, state就是oc中的model,数据对象
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
        const {onRefreshPopular, onLoadMorePopular} = this.props; // connect 之后产生的对象方法.
        const url = this.genFetchUrl(this.storeName);
        const store = this._store();
        console.log(store);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {  //pageSize 设置为常量,防止修改
                this.refs.toast.show('没有更多了');
            })
        } else {
            onRefreshPopular(this.storeName, url, pageSize); // pageSize 设置为常量,防止修改
            // 另一种写法
            // const {dispatch} = this.props;
            // dispatch(actions.onRefreshPopular(this.storeName, url));
        }
    }

    genFetchUrl(storeName) {
        return URL + storeName + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            item={item}
            onSelect={
                () => {

                }

            }
        />

        // <View style={{marginBottom: 20}}>
        //     <Text style={{backgroundColor: '#C0C0C0'}}>{
        //         JSON.stringify(item)
        //     }</Text>
        // </View>
    }

    genIndicator(){
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
                keyExtractor={item => "" + item.id}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={THEME_COLOR}
                        colors={THEME_COLOR}
                        refreshing={store.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={THEME_COLOR}
                    />
                }

                ListFooterComponent={() => this.genIndicator()}
                onEndReached={()=>{
                    console.log('---onEndReached---');
                    setTimeout(()=>{
                        if (this.canLoadMore) { //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                            this.loadData(true);
                            this.canLoadMore = false;
                        }
                    },100);
                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={()=>{
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
    popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url, pageSize = {}) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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
        minWidth: 50,

    },
    indicatorStyle: {
        backgroundColor: 'white',
        height: 2,
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        height: 90,
        marginTop: 10,
    },
    indicatorContainer:{
      alignItems: 'center',
    },
    indicator:{
        color: 'red',
        margin: 10
    }
});
