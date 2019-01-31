import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import FavoritePage from '../page/FavoritePage'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import MyPage from '../page/MyPage'
import NavigationUtil from '../navigator/NavigationUtil';
import {BottomTabBar} from 'react-navigation-tabs'
import {connect} from 'react-redux';

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />)
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />)
        }
    },

    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />)
        }
    },

    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <FontAwesome
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />)
        }
    },
};


export class DynamicTabNavigator extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {}
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};//根据需要定制显示的tab
        // PopularPage.navigationOptions.tabBarLabel = '最新'; //动态配置tab属性
        const AppBottomTabNavigator = createBottomTabNavigator(tabs, {
            tabBarComponent: props => {
                return <TabBarComponent theme={this.props.theme} {...props}>

                </TabBarComponent>
            },
        });
        return this.Tabs = createAppContainer(AppBottomTabNavigator);
    }

    render() {
        // NavigationUtil.navigation = this.props.navigation;
        const Tab = this._tabNavigator();
        return <Tab/>;
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        // 使用reducer之前设置主题颜色
        // const {routes, index} = this.props.navigation.state;
        // if (routes[index].params) {
        //     const {theme} = routes[index].params;
        //     // 以最新的更新时间为主,防止被其他的Tab之前的修改覆盖掉
        //     if (theme && theme.updateTime > this.theme.updateTime) {
        //         this.theme = theme;
        //     }
        // }

        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />;
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);