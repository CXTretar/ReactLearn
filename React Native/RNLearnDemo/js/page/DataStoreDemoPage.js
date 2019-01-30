import React, {Component} from 'react';
import {TextInput, StyleSheet, AsyncStorage, Text, View} from 'react-native';
import DataStore from '../expand/dao/DataStore';

const KEY = 'save_key';

export default class DataStoreDemoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        };
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次数据加载时间:${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData,
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.homePage}>离线缓存框架设计</Text>

                <View>
                    <TextInput style={styles.textInput} onChangeText={text => {
                        this.searchKey = text;
                    }}/>

                </View>

                <View style={styles.textContainer}>
                    <Text onPress={() => {
                        this.loadData();
                    }}>
                        获取
                    </Text>

                </View>

                <Text>{this.state.showText}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    homePage: {
        justifyContent: 'center',
        fontSize: 20,
    },

    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-around',
    }
});
