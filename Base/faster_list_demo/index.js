/** @format */

import {AppRegistry} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import App from './App';
import FlatListDemo from './pages/FlatListDemo'
import {name as appName} from './app.json';

const AppRoot = createStackNavigator({
    App:{
        screen: App,
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo',
        }
    }
});

const AppStackNavigatorContainer = createAppContainer(AppRoot)

AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
