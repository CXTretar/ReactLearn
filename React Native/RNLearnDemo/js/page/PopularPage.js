import React, {Component} from 'react';
import {FlatList, StyleSheet, Image, RefreshControl, Text, View} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItemNew'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
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
                backgroundColor:THEME_COLOR,
                barStyle:'light-content'
            };
            let navigationBar = <NavigationBar
                title={'最热'}
                statusBar={statusBar}
                style={{backgroundColor:THEME_COLOR}}
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

    loadData() {
        const {onLoadPopularData} = this.props; // connect 之后产生的对象方法.
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url);

        // const {dispatch} = this.props;
        // dispatch(actions.onLoadPopularData(this.storeName, url));
    }

    genFetchUrl(storeName) {
        return URL + storeName + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            item = {item}
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

    render() {
        const {popular} = this.props; // connect 之后产生的对象属性.
        console.log(popular);
        let store = popular[this.storeName]; // 动态获取state, state就是oc中的model,数据对象
        if (!store) { // 初始化store,类似于oc中对 NSDictionary 的懒加载初始化
            store = {
                items: [],
                isLoading: false,
            }
        }
        return <View style={styles.container}>
            <FlatList
                data={store.items}
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
            />

        </View>;
    }

}

const mapStateToProps = state => ({
    popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url)),
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
    }
});
