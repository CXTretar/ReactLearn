import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import FavoritePage from './FavoritePage'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'


type Props = {};

export default class HomePage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {}
    }

    _tabNavgator() {

        const AppBottomTabNavigator = createBottomTabNavigator({
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
                }
                ,
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
                }
                ,
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
                }
                ,
            })
        ;
        return createAppContainer(AppBottomTabNavigator);
    }

    render() {
        const Tab = this._tabNavgator();
        return <Tab/>;
    }
}

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
});
