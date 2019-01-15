import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Boy from './Boy'

type Props = {};
export default class Girl extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height:10}}/>

                <Text style={styles.text}>
                    I am Girl
                </Text>

                <View style={{height:10}}/>

                <Text style={styles.text}>
                    {'收到礼物: ' + this.props.gift}
                </Text>

                <View style={{height:10}}/>

                <Text style={styles.text}
                    onPress={()=>{
                        this.props.onCallBack('一盒巧克力');
                        this.props.navigator.pop();
                    }}>
                    回赠男孩一份礼物
                </Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    }
})