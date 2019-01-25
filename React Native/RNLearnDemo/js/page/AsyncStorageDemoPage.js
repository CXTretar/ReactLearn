import React, {Component} from 'react';
import { TextInput, StyleSheet, AsyncStorage, Text, View } from 'react-native';

const KEY = 'save_key';

export default class AsyncStorageDemoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        }
    }

    async doSave() {
        // 用法一
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString())
        });

        // 用法二
        // AsyncStorage.setItem(KEY, this.value).catch(error => {
        //     error && console.log(error.toString())
        // });
        //
        // // 用法三
        // try {
        //     await AsyncStorage.setItem(KEY, this.value);
        // } catch (error) {
        //     error && console.log(error.toString())
        // }
    }

    async doRemove() {
        // 用法一
        AsyncStorage.removeItem(KEY,error => {
            error && console.log(error.toString())
        });

        // 用法二
        // AsyncStorage.removeItem(KEY)
        //     .catch(error => {
        //     error && console.log(error.toString())
        // });
        //
        // 用法三
        // try {
        //     await AsyncStorage.removeItem(KEY);
        // } catch (error) {
        //     error && console.log(error.toString())
        // }
    }

    async getData() {
        // 用法一
        AsyncStorage.getItem(KEY,(error, result) => {
            this.setState({
                showText:result,
            });
            console.log(result);
            error && console.log(error.toString());
        });

        // 用法二
        // AsyncStorage.getItem(KEY)
        //     .then(result => {
        //         this.setState({
        //             showText:result,
        //         });
        //     })
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });

        // 用法三
        // try {
        //     const value = await AsyncStorage.getItem(KEY);
        //     if (value !== null) {
        //         // We have data!!
        //         this.setState({
        //             showText:value,
        //         })
        //     }
        // } catch (error) {
        //     error && console.log(error.toString())
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.homePage}>AsyncStorage 基本使用</Text>

                <View>
                    <TextInput style={styles.textInput} onChangeText={text => {
                        this.value = text;
                    }}/>

                </View>

                <View style={styles.textContainer}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>
                        保存
                    </Text>
                    <Text onPress={() => {
                        this.doRemove();
                    }}>
                        删除
                    </Text>
                    <Text onPress={() => {
                        this.getData();
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
