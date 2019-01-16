/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class HomePage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page1!</Text>
        <Button
            title={'Go to Page1'}
            onPress={()=>{
              navigation.navigate('Page1', {name: '动态的'})
            }}
        />
        <Button
            title={'Go to Page2'}
            onPress={()=>{
              navigation.navigate('Page2')
            }}
        />
        <Button
            title={'Go to Page3'}
            onPress={()=>{
              navigation.navigate('Page3', {name: 'Devio'})
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
