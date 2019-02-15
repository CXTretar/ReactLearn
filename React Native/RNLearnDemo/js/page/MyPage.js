import React, {Component} from 'react';
import {ScrollView, StyleSheet, Image, Text, View, TouchableOpacity, Button} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MenuTypes} from "../common/MenuTypes";
import GlobalStyles from "../../res/styles/GlobalStyles";
import ViewUtil from "../util/ViewUtil";

const THEME_COLOR = '#678';

type Props = {};

export class MyPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onClick(menu) {
        let RouteName, params = {};
        switch (menu) {
            case MenuTypes.Tutorial:
                RouteName = 'WebViewPage';
                params = {
                    title:'教程',
                    url:'https://coding.m.imooc.com/classindex.html?cid=89'
                };
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }

    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{backgroundColor: THEME_COLOR}}
            />;

        return (


            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        style={styles.item}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MenuTypes.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR,
                                }}
                            />
                            <Text>
                                GitHub Popular
                            </Text>
                        </View>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: THEME_COLOR,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={GlobalStyles.line}/>
                    {this.getItem(MenuTypes.Tutorial)}
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MenuTypes.Custom_Language)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MenuTypes.Sort_Language)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MenuTypes.Custom_Key)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MenuTypes.Sort_Key)}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MenuTypes.Remove_Key)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MenuTypes.Custom_Theme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MenuTypes.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this.getItem(MenuTypes.Feedback)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MenuTypes.CodePush)}

                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 30,
    },
    homePage: {
        justifyContent: 'center',
        fontSize: 20,
    },
    about_left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    groupTitle: {
        color: 'gray',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
    },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);