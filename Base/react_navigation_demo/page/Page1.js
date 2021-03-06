/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, View} from 'react-native';
import Page4 from '../page/Page4'


type Props = {};
export default class Page1 extends Component<Props> {
    render() {
        const {navigation} = this.props;
        console.log(navigation)
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Page1!</Text>
                <Button
                    title={'Go Back'}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
                <Button
                    title={'跳转到页面4'}
                    onPress={() => {
                        navigation.navigate('DrawerNav', {name: 'DrawerNavigator'})
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
