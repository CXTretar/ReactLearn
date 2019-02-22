import React from 'react'

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import SearchPage from '../page/SearchPage';
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import DataStoreDemoPage from '../page/DataStoreDemoPage';

import {connect} from 'react-redux'
import {reduxifyNavigator, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers'
// import SwitchRouter from ''

import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';
import WebViewPage from "../page/WebViewPage";
import AboutPage from "../page/about/AboutPage";
import AboutAuthorPage from "../page/about/AboutAuthorPage";
import CustomKeyPage from "../page/CustomKeyPage";
import SortKeyPage from "../page/SortKeyPage";

export const rootCom = 'Init'; // 设置根路由

const InitNavigator = createStackNavigator({

    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,
        }
    },

});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null,
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null,
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null,
        }
    },
    AboutAuthorPage:{
        screen:AboutAuthorPage,
        navigationOptions:{
            header:null,
        }
    },
    CustomKeyPage:{
        screen:CustomKeyPage,
        navigationOptions:{
            header:null,
        }
    },
    SortKeyPage:{
        screen:SortKeyPage,
        navigationOptions:{
            header:null,
        }
    },
    SearchPage:{
        screen:SearchPage,
        navigationOptions:{
            header:null,
        }
    },


});

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
}));

// export const RootNavigatorContainer = createAppContainer(RootNavigator);

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */

export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */

export const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,
});

/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);