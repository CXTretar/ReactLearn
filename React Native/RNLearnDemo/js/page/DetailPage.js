import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View} from 'react-native';

type Props = {};

export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.detailPage}>DetailPage</Text>
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
    detailPage: {
        justifyContent: 'center',
        fontSize: 20,
    },
});
