import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    View,
    ActivityIndicator,
    DeviceInfo,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';

import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import LanguageDao from "../expand/dao/LanguageDao";
import BackPressComponent from "../common/BackPressComponent";
import ViewUtil from "../util/ViewUtil";
import GlobalStyles from '../../res/styles/GlobalStyles'
import Utils from "../util/Utils";

const pageSize = 10; // pageSize 设置为常量,防止修改
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
const languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);

type Props = {};

export class SearchPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {};
        this.isKeyChange = false;
        this.backPress = new BackPressComponent({backPress: this.onBackPress});
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress = () => {
        this.onBack();
        return true;
    };

    onBack() {
        const {onSearchCancel, onLoadLanguageData, onSaveSearchKey} = this.props;
        onSearchCancel();//退出时取消搜索
        this.refs.input.blur();
        NavigationUtil.goBack(this.props.navigation);
        if (this.isKeyChange) {
            onLoadLanguageData(FLAG_LANGUAGE.flag_key);//重新加载标签
        }
        onSaveSearchKey();
        return true;
    }

    loadData(loadMore) {
        const {onSearch, onLoadMoreSearch, search, keys} = this.props; // connect 之后产生的对象方法.
        if (loadMore) {
            onLoadMoreSearch(++search.pageIndex, pageSize, search.items, favoriteDao, () => {  //pageSize 设置为常量,防止修改
                this.refs.toast.show('没有更多了');
            })
        } else {
            onSearch(this.inputKey, pageSize, this.searchToken = new Date().getTime(), favoriteDao, keys, message => {
                this.refs.toast.show(message);
            });
        }
    }

    renderItem(data) {
        const {theme} = this.params;
        const item = data.item;
        return <PopularItem
            theme={theme}
            projectModel={item}
            onSelect={
                (callback) => {
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: FLAG_STORAGE.flag_popular,
                        callback,
                        theme,
                    }, 'DetailPage')
                }
            }

            onFavorite={(item, isFavorite) => {
                FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)
            }}
        />
    }

    genIndicator() {
        const {search} = this.props;
        const {theme} = this.params;
        return search.hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color: theme.themeColor, margin: 10}}
                />
                <Text style={{color: theme.themeColor}}>正在加载更多</Text>
            </View>
    }

    /**
     * 添加标签
     */
    saveKey() {
        const {keys} = this.props;
        let key = this.inputKey;
        if (Utils.checkKeyIsExist(keys, key)) {
            this.refs.toast.show(key + '已经存在');
        } else {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            keys.unshift(key);//将key添加到数组的开头
            languageDao.save(keys);
            this.refs.toast.show(key.name + '保存成功');
            this.isKeyChange = true;

        }
    }

    onRightButtonClick() {
        const {onSearchCancel, search} = this.props;
        if (search.showText === '搜索') {
            this.loadData();
        } else {
            onSearchCancel(this.searchToken);
        }
    }

    renderRightButton() {
        const {search} = this.props;
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={() => {
                this.onRightButtonClick();
                this.refs.input.blur();//收起键盘
            }}>
            <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>{search.showText}</Text>
        </TouchableOpacity>
    }

    renderNavBar() {
        const {theme} = this.params;
        const {inputKey} = this.props.search;
        const placeholder = inputKey || "请输入";
        let backButton = ViewUtil.getLeftBackButton(() => this.onBackPress());
        let inputView = <TextInput
            ref={'input'}
            placeholder={placeholder}
            onChangeText={text => this.inputKey = text}
            style={styles.textInput}
        />;
        let searchButton = this.renderRightButton();
        return <View style={{
            backgroundColor: theme.themeColor,
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        }}>
            {backButton}
            {inputView}
            {searchButton}
        </View>
    }

    render() {
        const {isLoading, projectModels, showBottomButton, hideLoadingMore} = this.props.search;
        const {theme} = this.params;
        let statusBar = null;
        if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
            statusBar = <View style={[styles.statusBar, {backgroundColor: theme.themeColor}]}/>
        }
        let listView = isLoading ? null : <FlatList
            data={projectModels}
            renderItem={(data) => this.renderItem(data)}
            keyExtractor={item => "" + item.item.id}
            contentInset={{bottom: 45}}
            refreshControl={
                <RefreshControl
                    title={'Loading'}
                    titleColor={theme.themeColor}
                    colors={[theme.themeColor]}
                    refreshing={isLoading}
                    onRefresh={() => this.loadData()}
                    tintColor={theme.themeColor}
                />
            }

            ListFooterComponent={() => this.genIndicator()}
            onEndReached={() => {
                console.log('---onEndReached---');
                setTimeout(() => {
                    if (this.canLoadMore) { //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                        this.loadData(true);
                        this.canLoadMore = false;
                    }
                }, 100);
            }}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
                this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                console.log('---onMomentumScrollBegin-----');
            }}
        />;

        let bottomButton = showBottomButton ?
            <TouchableOpacity
                style={[styles.bottomButton, {backgroundColor: theme.themeColor}]}
                onPress={() => {
                    this.saveKey();
                }}
            >
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title}>朕收下了</Text>
                </View>
            </TouchableOpacity> : null;

        let indicatorView = !isLoading ? null
            : <ActivityIndicator
                style={styles.indicatorCenterStyle}
                color={theme.themeColor}
                size='large'
                animating={isLoading}
            />;

        let contentView = <View style={{flex: 1}}>
            {indicatorView}
            {listView}
        </View>;

        return (<View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
                {statusBar}
                {this.renderNavBar()}
                {contentView}
                {bottomButton}
                <Toast ref="toast"
                       position={'center'}
                />
            </View>

        );
    }
}

const mapPopularStateToProps = state => ({
    keys: state.language.keys,
    search: state.search,
});

const mapPopularDispatchToProps = dispatch => ({
    onSearch: (inputKey, pageSize, token, favoriteDao, popularKeys, callback) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callback)),
    onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
    onSaveSearchKey: () => dispatch(actions.onSaveSearchKey()),
    onLoadMoreSearch: (pageIndex, pageSize, dataArray = [], favoriteDao, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, dataArray, favoriteDao, callBack)),
    onLoadLanguageData: (flagKey) => dispatch(actions.onLoadLanguageData(flagKey)),
});

export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(SearchPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "white",
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white'
    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicatorStyle: {
        backgroundColor: 'white',
        height: 2,
    },
    indicatorCenterStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: GlobalStyles.window_height - 45 - (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
        right: 10,
        borderRadius: 3
    },
    title: {
        fontSize: 18,
        color: "white",
        fontWeight: '500'
    },
});
