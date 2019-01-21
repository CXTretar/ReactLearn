import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View, Button} from 'react-native';

type Props = {};

export default class TrendingPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.homePage}>HomePage</Text>
                <Button title={'改变主题颜色'} onPress={()=>{

                    navigation.setParams({
                        theme: {
                            tintColor:'red',
                            updateTime: new Date().getTime(),
                        }
                    })
                }}/>
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
