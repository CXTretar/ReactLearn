import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, TouchableOpacity, Button} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THEME_COLOR = '#678';

type Props = {};
export class MyPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
                <View style={{padding: 5,marginRight: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color:'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
                <View style={{padding: 8,marginLeft: 12}}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={24}
                        style={{color:'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{backgroundColor:THEME_COLOR}}
                rightButton={this.getRightButton()}
                leftButton={this.getLeftButton()}
            />;

        return (


            <View style={styles.container}>

                {navigationBar}
                <Text style={styles.homePage}>MyPage</Text>
                <Button title={'改变主题颜色'} onPress={() => {
                    this.props.onThemeChange('blue')
                }}/>

                <Text onPress={() => {
                    NavigationUtil.goPage({
                        // title:'详情页',
                        navigation: this.props.navigation,
                    }, 'DetailPage')
                }}>
                    跳转到详情页
                </Text>
                <View style={styles.buttonContainer}>
                    <Button title={'Fetch 基本使用'} onPress={() => {
                        NavigationUtil.goPage({
                            // title:'详情页',
                            navigation: this.props.navigation,
                        }, 'FetchDemoPage')
                    }}/>
                    <Button title={'AsyncStorage 基本使用'} onPress={() => {
                        NavigationUtil.goPage({
                            // title:'详情页',
                            navigation: this.props.navigation,
                        }, 'AsyncStorageDemoPage')
                    }}/>
                    <Button title={'离线缓存框架设计'} onPress={() => {
                        NavigationUtil.goPage({
                            // title:'详情页',
                            navigation: this.props.navigation,
                        }, 'DataStoreDemoPage')
                    }}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 30,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    homePage: {
        justifyContent: 'center',
        fontSize: 20,
    },
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps,mapDispatchToProps)(MyPage);