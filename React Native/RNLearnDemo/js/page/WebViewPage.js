import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    DeviceInfo
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";

type Props = {};

export default class WebViewPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {title, url} = this.params;
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
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

    };

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        const {theme} = this.params;
        let navigationBar =
            <NavigationBar
                title={this.state.title}
                style={{backgroundColor: theme.themeColor}}
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
