/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components';
import Boy from './Boy'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'tab_popular',
    }
  }


  render() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.container}>
            {/*
            <TabNavigator tabBarStyle={{flex: 1, backgroundColor: '#fff'}}>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tab_popular'}
                  selectedTitleStyle={{color: 'red'}}
                  title="最热"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_popular.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('./res/images/ic_popular.png')} />}
                  badgeText="1"
                  onPress={() => this.setState({ selectedTab: 'tab_popular' })}>
                <View style={styles.tab_popular}></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tab_trending'}
                  selectedTitleStyle={{color: 'blue'}}
                  title="趋势"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'blue'}]} source={require('./res/images/ic_trending.png')} />}
                  onPress={() => this.setState({ selectedTab: 'tab_trending' })}>
                <View style={styles.tab_trending}></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tab_favor'}
                  selectedTitleStyle={{color: 'blue'}}
                  title="收藏"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_favorite.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'blue'}]} source={require('./res/images/ic_favorite.png')} />}
                  onPress={() => this.setState({ selectedTab: 'tab_favor' })}>
                <View style={styles.tab_trending}></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tab_my'}
                  selectedTitleStyle={{color: 'blue'}}
                  title="我的"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_my.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'blue'}]} source={require('./res/images/ic_my.png')} />}
                  onPress={() => this.setState({ selectedTab: 'tab_my' })}>
                <View style={styles.tab_trending}></View>
              </TabNavigator.Item>
            </TabNavigator>
             */}
            <Navigator
                initialRoute={{
                  component: Boy,
                }}
                renderScene={(route, navigator)=> {
                  let Component=route.component;
                  return <Component navigator={navigator} {...route.params}/>;
                }}
            />
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tab_popular: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tab_trending: {
    flex: 1,
    backgroundColor: 'blue',
  },
  image: {
    height: 22,
    width: 22,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});
