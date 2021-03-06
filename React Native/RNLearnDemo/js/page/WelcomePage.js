import React, {Component} from 'react';
import { Platform, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
import SplashScreen from 'react-native-splash-screen'
import actions from "../action";
import {connect} from "react-redux";

type Props = {};

export class WelcomePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount(): void {
        const {onThemeInit} = this.props;
        onThemeInit();
        this.timer = setTimeout(() => {
            SplashScreen.hide()
            NavigationUtil.resetToHomePage(this.props)
        }, 200)
    }

    componentWillMount(): void {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeInit: () => dispatch(actions.onThemeInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        justifyContent: 'center',
        fontSize: 20,
    },
});

