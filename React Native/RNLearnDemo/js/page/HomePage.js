import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import FavoritePage from './FavoritePage'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>;
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
