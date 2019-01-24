import React, {Component} from 'react';
import {TextInput, StyleSheet, Image, SafeAreaView, Text, View, Button} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

export default class FetchDemoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: '',
        }
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    result: responseText,
                })
            })
    }

    loadData2() {
        let url = `https://api.github.com/search/q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response is not ok.');
                }
            })
            .then(responseText => {
                this.setState({
                    result: responseText,
                })
            })
            .catch(e => {
                this.setState({
                    result: e.toString(),
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.homePage}>Fetch 基本使用</Text>

                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={text => {
                        this.searchKey = text;
                    }}/>


                    <Button title={'search'} onPress={() => {
                        this.loadData();
                        // this.loadData2();
                    }}/>

                </View>
                <Text>{this.state.result}</Text>

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
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },

    textInput: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
    },
});
