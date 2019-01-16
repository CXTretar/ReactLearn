import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    View,
    ViewPropTypes,
    Text,
    Image,
    Platform,
    StyleSheet
} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;

export default class NavigationBar extends Component {

    static propTypes = {
        title: PropTypes.string,
        titleView: PropTypes.element,
        hidden: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
    }

    constructor(props){
        super(props);

        this.state = {
            title: '',
            hide: false,
        }
    }

    render() {
        let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewContainer}>{titleView}</View>
            {this.props.rightButton}
        </View>
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS == 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        backgroundColor: 'red',
        flexDirection: 'row'
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'white',
    }
})