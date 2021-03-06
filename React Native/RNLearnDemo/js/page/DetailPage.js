import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    SafeAreaView,
    Text,
    View,
    WebView,
    TouchableOpacity,
    DeviceInfo
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import FavoriteDao from "../expand/dao/FavoriteDao";
import FavoriteUtil from "../util/FavoriteUtil";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";

const TRENDING_URL = 'https://github.com/';

type Props = {};

export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel, flag} = this.params;
        this.favoriteDao = new FavoriteDao(flag); // 根据flag创建 FavoriteDao
        this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
        const title = projectModel.item.full_name || projectModel.item.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite,
        };
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
        if (this.state.canGoBack) {
            this.webView.goBack()
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }

    }

    onFavoriteButtonClick() {
        const {projectModel, callback} = this.params;
        const isFavorite = projectModel.isFavorite = !projectModel.isFavorite;
        // debugger;
        callback(isFavorite);
        this.setState({
            isFavorite: isFavorite,
        });
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }

    }

    renderRightButton() {
        return <View
            style={{flexDirection: 'row'}}
        >
            <TouchableOpacity
                onPress={() => this.onFavoriteButtonClick()}
            >
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={20}
                    style={{color: 'white', marginRight: 10}}
                />
            </TouchableOpacity>
            {
                ViewUtil.getShareButton(() => {

                })
            }
        </View>

    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        const {theme} = this.params;
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar =
            <NavigationBar
                title={this.state.title}
                titleLayoutStyle={titleLayoutStyle}
                style={{backgroundColor: theme.themeColor}}
                rightButton={this.renderRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            />;

        return (

            <SafeAreaViewPlus style={styles.container} topColor={theme.themeColor}>
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={navState => this.onNavigationStateChange(navState)}
                    source={{uri: this.state.url}}
                />
            </SafeAreaViewPlus>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
