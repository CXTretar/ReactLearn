import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceInfo,
    TouchableOpacity,
    TouchableHighlight,
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
import SortableListView from 'react-native-sortable-listview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrayUtil from "../util/ArrayUtil";

const THEME_COLOR = '#678';
type Props = {};

export class SortKeyPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params; // 取出上级界面传过来的参数
        this.backPress = new BackPressComponent({backPress: this.onBackPress}); //设置安卓物理返回键
        const {flag} = this.params;
        this.languageDao = new LanguageDao(flag); // flag 代表是标签排序还是语言排序
        this.state = {
            checkedArray: [] // 初始化默认标签数组
        };
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        // 1. 如果props中标签为空则从本地存储中获取标签
        if (SortKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguageData} = this.props;
            onLoadLanguageData(this.params.flag);
        }
        // 2. 通过设置state以及来getDerivedStateFromProps赋值render
        this.setState({
            checkedArray: SortKeyPage._keys(this.props),
        });
    }


    componentWillUnmount() {

        this.backPress.componentWillUnmount();
    }

    static _flag(props) {
        const {flag} = props.navigation.state.params;
        return flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages";
    }

    /**
     *
     * @param props
     * @param state
     * @returns {*}
     * @private
     */
    static _keys(props, state) {
        //如果state中有checkedArray则使用state中的checkedArray
        if (state && state.checkedArray && state.checkedArray.length) {
            return state.checkedArray;
        }

        const flag = SortKeyPage._flag(props);
        let dataArray = props.language[flag] || [];
        let keys = [];
        for (let i = 0, len = dataArray.length; i < len; i++) {
            let data = dataArray[i];
            if (data.checked) {
                keys.push(data);
            }

        }
        return keys;
    }

    onBackPress = () => {
        this.onBack();
        return true;
    };

    onBack() {
        // 比较原数组和现有的数组的是否相同
        if (!ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
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
                        this.onSave(true);
                    }
                }
            ])
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }

    }


    onSave(hasChecked) {

        if (!hasChecked) {
            if (ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
                NavigationUtil.goBack(this.props.navigation);
                return;
            }
        }
        //保存排序后的数据
        //获取排序后的数据
        //更新本地数据
        this.languageDao.save(this.getSortResult());
        //重新加载排序后的标签，以便其他页面能够及时更新
        const {onLoadLanguageData} = this.props;
        //更新store
        onLoadLanguageData(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }

    /**
     * 获取排序后的标签结果
     * @returns {Array}
     */
    getSortResult() {
        const flag = SortKeyPage._flag(this.props);
        //从原始数据中复制一份数据出来，以便对这份数据进行进行排序
        let sortResultArray = ArrayUtil.clone(this.props.language[flag]);
        //获取排序之前的排列顺序
        const originalCheckedArray = SortKeyPage._keys(this.props);
        //遍历排序之前的数据，用排序后的数据checkedArray进行替换
        for (let i = 0, len = originalCheckedArray.length; i < len; i++) {
            let item = originalCheckedArray[i];
            //找到要替换的元素所在位置
            let index = this.props.language[flag].indexOf(item);
            //进行替换
            sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
        return sortResultArray;

    }

    renderRightButton() {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={() => this.onSave()}>
            <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>完成</Text>
        </TouchableOpacity>
    }

    render() {
        let title = this.params.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';
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

        // SortableListView的用法具体参考 https://github.com/deanmcpherson/react-native-sortable-listview/blob/master/example.js
        return (<View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
                {navigationBar}

                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} {...this.params}/>}
                />
            </View>

        );
    }
}

class SortCell extends Component {
    render(): React.ReactNode {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}
        >
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                < MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{
                        marginRight: 10,
                        color: THEME_COLOR,
                    }}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>;
    }

}


const mapSortKeyStateToProps = state => ({
    language: state.language,
});

const mapSortKeyDispatchToProps = dispatch => ({
    onLoadLanguageData: (flagKey) => dispatch(actions.onLoadLanguageData(flagKey)),
});

export default connect(mapSortKeyStateToProps, mapSortKeyDispatchToProps)(SortKeyPage);

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
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    hidden: {
        height: 0,
    }
});
