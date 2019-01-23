/** @format */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation'
// import RootNavigator from './js/navigator/AppNavigator'



AppRegistry.registerComponent(appName, () => App);
