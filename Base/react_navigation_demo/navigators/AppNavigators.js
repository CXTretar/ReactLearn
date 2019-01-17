import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createDrawerNavigator,
    DrawerItems,
    createSwitchNavigator
} from 'react-navigation'
import React from 'react'
import {Button, Platform, ScrollView, SafeAreaView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import HomePage from '../page/HomePage'
import Page1 from '../page/Page1'
import Page2 from '../page/Page2'
import Page3 from '../page/Page3'
import Page4 from '../page/Page4'
import Page5 from '../page/Page5'
import Login from '../page/Login'


const AppDrawerNavigator = createDrawerNavigator({
        Page4: {
            screen: Page4,
            navigationOptions: {
                drawerLabel: 'Page4',
                drawerIcon: ({tintColor}) => {
                    return <MaterialIcons
                        name={'drafts'}
                        size={24}
                        style={{
                            color: tintColor,
                        }}
                    />
                }
            }
        },
        Page5: {
            screen: Page5,
            navigationOptions: {
                drawerLabel: 'Page5',
                drawerIcon: ({tintColor}) => {
                    return <MaterialIcons
                        name={'move-to-inbox'}
                        size={24}
                        style={{
                            color: tintColor,
                        }}
                    />
                }
            }
        }

    }, {
        initialRouteName: 'Page4',
        contentOptions: {
            activeTintColor: '#e91e63',
        },
        contentComponent: (props) => (
            <ScrollView
                style={{
                    backgroundColor: '#bbb',
                    flex: 1
                }}
            >
                <SafeAreaView forceInset={{
                    top: 'always',
                    horizontal: 'never',
                }}>
                    <DrawerItems {...props}/>
                </SafeAreaView>
            </ScrollView>

        ),
    }
);

const AppTopTabNavigator = createMaterialTopTabNavigator({
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'All',
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: 'iOS',
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: 'React',
            }
        },
        Page4: {
            screen: Page4,
            navigationOptions: {
                tabBarLabel: 'React Native',
            }
        },
        Page5: {
            screen: Page5,
            navigationOptions: {
                tabBarLabel: 'Devio',
            }
        },
    }, {
        tabBarOptions: {
            tabStyle: {
                minWidth: 50,
            },
            upperCaseLabel: false, //是否使标签大写，默认为true
            scrollEnabled: true, // 是否支持 选项卡滚动,默认false
            style: {             // TabBar 背景颜色
                backgroundColor: '#678',
            },
            indicatorStyle: {  // 标签指示器样式
                height: 2,
                backgroundColor: 'white'
            },
            labelStyle: {  // 文字的样式
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
            }
        }
    }
);

const AppBottomTabNavigator = createBottomTabNavigator({
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: '最热',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'ios-home'}
                        size={26}
                        style={{
                            color: tintColor
                        }}
                    />
                ),
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'ios-people'}
                        size={26}
                        style={{
                            color: tintColor
                        }}
                    />
                ),

            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'ios-chatboxes'}
                        size={26}
                        style={{
                            color: tintColor
                        }}
                    />
                ),
            }
        },
        Page4: {
            screen: Page4,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'ios-aperture'}
                        size={26}
                        style={{
                            color: tintColor
                        }}
                    />
                ),
            }
        },
    }, {
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
        }
    }
);


export const AppStackNavigator = createStackNavigator({

    HomePage: {
        screen: HomePage,
        navigationOptions: () => ({ // 静态态配置 navigationOptions
            title: 'HomePage'
        })
        // navigationOptions: {
        //     title: 'HomePage'
        // }
        // navigationOptions: ()=>{
        //     return {
        //         title: 'HomePage'
        //     }
        // }
    },
    Page1: {
        screen: Page1,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}页面名`  // 动态配置 navigationOptions
        })
    },
    Page2: {
        screen: Page2,
        navigationOptions: ({navigation}) => ({ // 静态态配置 navigationOptions
            title: 'This is Page2'
        })
    },
    Page3: {
        screen: Page3,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title: params.title ? params.title : 'This is Page3',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? '保存' : '收藏'}
                        onPress={() => setParams({
                            mode: params.mode === 'edit' ? '' : 'edit'
                        })}
                    />
                )
            }
        }
    },
    Page4: {
        screen: Page4,
        navigationOptions: ({navigation}) => ({
            title: 'This is Page4'
        })
    },
    Bottom: {
        screen: AppBottomTabNavigator,
        navigationOptions: {
            title: 'BottomNavigator'
        }
    },
    Top: {
        screen: AppTopTabNavigator,
        navigationOptions: {
            title: 'TopNavigator'
        }
    },
    DrawerNav: {
        screen: AppDrawerNavigator,
        navigationOptions: {
            title: 'DrawerNavigator'
        }
    }

});

const AppStack = createStackNavigator({
    Home: {
        screen: HomePage,
    },
    Page1: {
        screen: Page1,
    }
});

const AuthStack = createStackNavigator({
        Login: {
            screen: Login,
        },
    }, {
        navigationOptions: {}
    }
);

export default createSwitchNavigator({
        Auth: AuthStack,
        App: AppStackNavigator,
        // App: AppStack,
    }, {
        initialRouteName: 'Auth',
    }
);
