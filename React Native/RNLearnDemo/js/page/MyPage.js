import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, Button} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";

export class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
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
        alignItems: 'center',
        justifyContent: 'center',
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