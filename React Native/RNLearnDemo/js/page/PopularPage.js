import React, {Component} from 'react';
import {Button, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import DetailPage from './DetailPage';
import FetchDemoPage from './FetchDemoPage';

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
                screen: props => <PopularTab {...props} tabLabel={item}/>, // 如何在设置路由页面的同时传递参数, 非常有用!!
                navigationOptions: {
                    title: item,
                }
            }
        });
        return tabs;
    }

    render() {
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

        return (<View style={{flex: 1, marginTop: 44}}>
                <TabNavigatorContainer/>
            </View>

        );
    }
}

class PopularTab extends Component {

    render() {
        const {tabLabel} = this.props;

        return <View style={styles.container}>
            <Text style={styles.homePage}>{
                tabLabel
            }
            </Text>
            <Text onPress={() => {
                NavigationUtil.goPage({
                    // title:'详情页',
                    navigation: this.props.navigation,
                }, 'DetailPage')
            }}>
                跳转到详情页
            </Text>
            <View style={styles.buttonContainer}>
                <Button title={'Fetch 基本使用'} onPress={() => {
                    NavigationUtil.goPage({
                        // title:'详情页',
                        navigation: this.props.navigation,
                    }, 'FetchDemoPage')
                }}/>
                <Button title={'AsyncStorage 基本使用'} onPress={() => {
                    NavigationUtil.goPage({
                        // title:'详情页',
                        navigation: this.props.navigation,
                    }, 'AsyncStorageDemoPage')
                }}/>
                <Button title={'离线缓存框架设计'} onPress={() => {
                    NavigationUtil.goPage({
                        // title:'详情页',
                        navigation: this.props.navigation,
                    }, 'DataStoreDemoPage')
                }}/>
            </View>


        </View>;
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
        marginTop:10,
    }
});
