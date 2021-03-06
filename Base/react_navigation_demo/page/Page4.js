/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
// import { DrawerActions } from 'react-navigation-drawer';

type Props = {};
export default class Page4 extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Page4!</Text>
                <Button title={'Open Drawer'} onPress={() => {
                    this.props.navigation.openDrawer()
                }}/>
                <Button title={'Close Drawer'} onPress={() => {
                    this.props.navigation.closeDrawer()
                }}/>
                <Button title={'Toggle Drawer'} onPress={() => {
                    this.props.navigation.toggleDrawer()
                }}/>

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
