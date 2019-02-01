import React from 'react';
import {BackHandler} from 'react-native';

/**
 * Android物理回退键处理
 */
export default class BackPressComponent {
    constructor(props) {
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress) BackHandler.addEventListener('hardwareBackPress');
    }

    componentWillUnmount() {
        if (this.props.backPress) BackHandler.removeEventListener('hardwareBackPress');
    }

    onHardwareBackPress(e) {
       return this.props.backPress(e);
    }
}
