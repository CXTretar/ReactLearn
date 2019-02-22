import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceInfo,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import {connect} from 'react-redux'
import actions from '../action/index'
import NavigationBar from '../common/NavigationBar'
import NavigationUtil from "../navigator/NavigationUtil";
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import BackPressComponent from "../common/BackPressComponent";
import LanguageDao from "../expand/dao/LanguageDao";
import ViewUtil from "../util/ViewUtil";
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ArrayUtil from "../util/ArrayUtil";

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
        if (prevState.keys !== CustomKeyPage._keys(nextProps, null, prevState)) {
            return {
                keys: CustomKeyPage._keys(nextProps, null, prevState),
            }
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
        });
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
            //如果state中的keys为空则从props中取出数组,并且修改checked为false
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(value => {
                return {
                    ...value,
                    checked: false,
                };
            })
        } else if (isRemoveKey) {
            return props.language[key];
        } else {
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(value => {
                return {
                    ...value,
                };
            });
        }
    }

    onBackPress = () => {
        this.onBack();
        return true;
    };

    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert('提示', '要保存修改吗?', [
                {
                    text: '否',
                    onPress: () => {
                        NavigationUtil.goBack(this.props.navigation);
                    }
                },
                {
                    text: '是',
                    onPress: () => {
                        this.onSave();
                    }
                }
            ])
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }

    }

    onSave() {
        if (this.changeValues.length === 0) {
            NavigationUtil.goBack(this.props.navigation);
            return;
        }
        let keys;
        if (this.isRemoveKey) {
            for (let i = 0, len = this.changeValues.length; i < len; i++) {
                ArrayUtil.remove(keys = CustomKeyPage._keys(this.props, true), this.changeValues[i], 'name')
            }
        }
        //更新本地数据
        this.languageDao.save(keys || this.state.keys);
        const {onLoadLanguageData} = this.props;
        //更新store
        onLoadLanguageData(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }

    renderRightButton() {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={() => this.onSave()}>
            <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>完成</Text>
        </TouchableOpacity>
    }

    onClick(data, index) {
        data.checked = !data.checked;
        // 更新 changeValues 数组
        ArrayUtil.updateArray(this.changeValues, data);
        //更新state以便显示选中状态
        this.state.keys[index] = data;
        this.setState({
            keys: this.state.keys,
        })
    }

    _checkedImage(checked) {
        const {theme} = this.params;
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: theme.themeColor,
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
        const {theme} = this.params;
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        title = this.params.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            title={title}
            statusBar={statusBar}
            style={theme.styles.navBar}
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
