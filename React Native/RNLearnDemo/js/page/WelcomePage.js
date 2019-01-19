import React, {Component} from 'react';
import { Platform, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';
import NavgationUtil from '../navigator/NavgationUtil'

type Props = {};

export default class WelcomePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            NavgationUtil.resetToHomePage(this.props)
        }, 2000)
    }

    componentWillMount(): void {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>WelcomePage</Text>
            </View>
        );
    }
}

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

