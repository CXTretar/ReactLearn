import React, {Component} from 'react';
import {View, Linking, Clipboard} from 'react-native'
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from '../../../res/data/config'
import {MenuTypes} from "../../common/MenuTypes";
import NavigationUtil from "../../navigator/NavigationUtil";
import ViewUtil from "../../util/ViewUtil";
import GlobalStyles from "../../../res/styles/GlobalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-easy-toast";

export default class AboutAuthorPage extends Component {
    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params;

        this.aboutCommon = new AboutCommon({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about_author,
        }, data => {
            this.setState({
                ...data,
            });
        });
        // showTutorial 等参数是为了变更二级items展示隐藏
        this.state = {
            data: config,
            showTutorial: true,
            showBlog: false,
            showQQ: false,
            showContact: false
        }
    }

    onClick(tab) {
        const {theme} = this.params;
        if (!tab) return;
        if (tab.url) {
            NavigationUtil.goPage({
                title: tab.title,
                url: tab.url,
                theme,
            }, 'WebViewPage');

            return;
        }
        // 判断二级item的account是否存在,并且是否是邮箱
        if (tab.account && tab.account.indexOf('@') > -1) {
            let url = 'mailto://' + tab.account;
            Linking.canOpenURL(url)
                .then(supported => {
                    if (!supported){
                        console.log('Can\'t handle url: ' + url);
                    }else {
                        return Linking.openURL(url);
                    }
                })
                .catch(err => console.error('An error occurred', err));
        }

        if (tab.account) {
            Clipboard.setString(tab.account);
            this.toast.show(tab.title + tab.account + '已复制到剪切板。');
        }

    }

    /**
     * 创建一级item
     * @param data    一级item的数据源
     * @param isShow  是否展示二级item
     * @param key     保存展示隐藏的属性对应的key
     * @returns {*}
     * @private
     */
    _item(data, isShow, key) {
        const {theme} = this.params;
        return ViewUtil.getSettingItem(() => {
            this.setState({
                [key]: !this.state[key]
            })
        }, data.name, theme.themeColor, Ionicons, data.icon, isShow ? 'ios-arrow-up' : 'ios-arrow-down')
    }

    /**
     * 创建二级item数组
     * @param dic   二级item的数据源
     * @param isShowAccount 二级item的数据是否含有account字段
     * @returns {*}
     */
    renderItems(dic, isShowAccount) {
        const {theme} = this.params;
        if (!dic) return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, theme.themeColor)}
                    <View style={GlobalStyles.line}/>
                </View>
            )
        }
        return views;
    }

    render(): React.ReactNode {
        const content = <View>
            {this._item(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
            <View style={GlobalStyles.line}/>
            {this.state.showTutorial ? this.renderItems(this.state.data.aboutMe.Tutorial.items) : null}

            {this._item(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(this.state.data.aboutMe.Blog.items) : null}

            {this._item(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(this.state.data.aboutMe.QQ.items, true) : null}

            {this._item(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(this.state.data.aboutMe.Contact.items, true) : null}

        </View>;
        return <View style={{flex:1}}>
            {this.aboutCommon.render(content, this.state.data.author)}
            <Toast ref={toast=>this.toast=toast}
                   position={'center'}
            />
        </View>

    }

}