import React, {Component} from 'react'
import {ViewPropTypes, StyleSheet, View, Text, Platform, StatusBar,DeviceInfo} from 'react-native'
import {PropTypes} from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

const StatusBarShape = {  //设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    backgroundColor: PropTypes.string,
    hidden: PropTypes.bool,
};

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //提供属性的类型检查
    static propTypes = {
        style: ViewPropTypes.style,                  // 导航栏样式
        title: PropTypes.string,                     // 导航栏 title
        titleView: PropTypes.element,                // 导航栏 titleView,可自定义
        titleLayoutStyle: ViewPropTypes.style,       // 导航栏 title 或者 titleView 的样式
        hide: PropTypes.bool,                        // 导航栏是否显示
        statusBar: PropTypes.shape(StatusBarShape),  // 导航栏 statusBar 的各项属性设置
        rightButton: PropTypes.element,              // 导航栏右侧按钮,等于 rightBarButtonItems
        leftButton: PropTypes.element,               // 导航栏左侧按钮,等于 leftBarButtonItems
    };

    //设置默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    };

    getButtonElement(data) {
        return (<View style={styles.navBarButton}>
            {data ? data : null}
        </View>)
    }

    render(): React.ReactNode {
        let statusBar = !this.props.statusBar.hidden ? <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar} />
        </View> : null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode={'head'} numberOfLines={1} style={styles.title}>{this.props.title}</Text>; // 默认的titleView 为文字

        let content = !this.props.hide ? <View style={styles.navBar}>
            {this.getButtonElement(this.props.leftButton)}
            <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                {titleView}
            </View>
            {this.getButtonElement(this.props.rightButton)}
        </View> : null;

        return (<View style={[styles.container, this.props.style]}>
            {statusBar}
            {content}
        </View>)
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3',
    },

    navBarButton: {
        alignItems: 'center'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0, // 安卓默认已经自动计算高度
    }
});