import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    View,
    ActivityIndicator,
    DeviceInfo,
    InteractionManager, TouchableOpacity,
    ScrollView
} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import BackPressComponent from "../common/BackPressComponent";
import LanguageDao from "../expand/dao/LanguageDao";
import ViewUtil from "../util/ViewUtil";
import FontAwesome from "./DetailPage";
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const pageSize = 10;

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
type Props = {};

export class CustomKeyPage extends Component<Props> {

    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params; // 取出上级界面传过来的参数
        this.backPress = new BackPressComponent({backPress: this.onBackPress}); //设置安卓物理返回键
        this.changeValues = []; // 改变后的标签数组
        this.isRemoveKey = !!this.params.isRemoveKey; // 是否是移除标签页面 !!a 等同于 a!=null&&typeof(a)!=undefined&&a!='' 作用是将a强制转换为布尔型
        this.languageDao = new LanguageDao(this.params.flag); // flag 代表是自定义标签还是自定义语言
        this.state = {
            keys: [] // 初始化默认标签数组
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const keys = CustomKeyPage._keys(nextProps, null, prevState);
        if (prevState.keys !== keys) {
            return {
                keys: keys,
            };
        }
        return null;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        // 1. 如果props中标签为空则从本地存储中获取标签
        if (CustomKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguageData} = this.props;
            onLoadLanguageData(this.params.flag);
        }
        // 2. 通过设置state以及来getDerivedStateFromProps赋值render
        this.setState({
            keys: CustomKeyPage._keys(this.props),
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    /**
     * 获取标签
     * @param props
     * @param original 移除标签时使用，是否从props获取原始对的标签
     * @param state 移除标签时使用
     * @returns {*}
     * @private
     */
    static _keys(props, original, state) {
        const {flag, isRemoveKey} = props.navigation.state.params;
        let key = flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages';
        if (isRemoveKey && !original) {

        } else {
            return props.language[key];
        }
    }

    onBackPress = () => {
        this.onBack();
        return true;
    };

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    save() {

    }

    renderRightButton() {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={() => this.save()}>
            <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>完成</Text>
        </TouchableOpacity>
    }

    onClick(data, index) {

    }

    _checkedImage(checked) {
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: '#678',
            }}
        />
    }

    renderCheckBox(data, index) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }

    renderView() {
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let views = [];
        for (let i = 0, len = dataArray.length; i < len; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }

    render() {
        const {keys} = this.props;
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        title = this.params.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            title={title}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
            rightButton={this.renderRightButton()}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        />;

        return (<View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
                {navigationBar}
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>

        );
    }
}

const mapCustomKeyStateToProps = state => ({
    language: state.language,
});

const mapCustomKeyDispatchToProps = dispatch => ({
    onLoadLanguageData: (flagKey) => dispatch(actions.onLoadLanguageData(flagKey)),
});

export default connect(mapCustomKeyStateToProps, mapCustomKeyDispatchToProps)(CustomKeyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    item: {
        flexDirection: 'row',
    },
});
