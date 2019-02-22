import React, {Component} from 'react';
import {ScrollView, StyleSheet, Image, Text, View, TouchableOpacity, Button} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MenuTypes} from "../common/MenuTypes";
import GlobalStyles from "../../res/styles/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

type Props = {};

export class MyPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onClick(menu) {
        const {theme} = this.props;
        let RouteName, params = {theme};
        switch (menu) {
            case MenuTypes.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MenuTypes.About:
                RouteName = 'AboutPage'
                break;
            case MenuTypes.About_Author:
                RouteName = 'AboutAuthorPage';
                break;
            case MenuTypes.Custom_Language:
            case MenuTypes.Custom_Key:
            case MenuTypes.Remove_Key:
                RouteName = 'CustomKeyPage';
                params.isRemoveKey = menu === MenuTypes.Remove_Key;
                params.flag = menu !== MenuTypes.Custom_Language ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                break;
            case MenuTypes.Sort_Key:
            case MenuTypes.Sort_Language:
                RouteName = 'SortKeyPage';
                params.flag = menu !== MenuTypes.Sort_Language ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                break;
            case MenuTypes.Custom_Theme:
                const {onShowCustomThemeView} = this.props;
                onShowCustomThemeView(true);
                break;
        }

        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }

    }

    getItem(menu) {
        const {theme} = this.props;
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, theme.themeColor);
    }

    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        };
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={theme.styles.navBar}
            />;

        return (


            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.onClick(MenuTypes.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MenuTypes.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: theme.themeColor,
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
                                color: theme.themeColor,
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

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
    onShowCustomThemeView: show => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);