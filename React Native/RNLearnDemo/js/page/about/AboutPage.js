import React, {Component} from 'react';
import {View} from 'react-native'
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from '../../../res/data/config'
import {MenuTypes} from "../../common/MenuTypes";
import NavigationUtil from "../../navigator/NavigationUtil";
import ViewUtil from "../../util/ViewUtil";
import GlobalStyles from "../../../res/styles/GlobalStyles";

const THEME_COLOR = '#678';
export default class AboutPage extends Component {
    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params;

        this.aboutCommon = new AboutCommon({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about,
        }, data => {
            this.setState({
                ...data,
            });
        });

        this.state = {
            data: config,
        }
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


    render(): React.ReactNode {
        const content = <View>
            {this.getItem(MenuTypes.Tutorial)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MenuTypes.About_Author)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MenuTypes.Feedback)}

        </View>;
        return this.aboutCommon.render(content,this.state.data.app);
    }

}