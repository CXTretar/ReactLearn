import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Girl from './Girl'

type Props = {};
export default class Boy extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            backGift: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height:10}}/>
                <Text style={styles.text}>I am Boy</Text>
                <View style={{height:10}}/>
                <Text style={styles.text}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:Girl,
                            params:{
                                gift:'一朵玫瑰🌹',
                                onCallBack:(backGift)=>{
                                    this.setState({
                                        backGift:backGift,
                                    })
                                }
                            }
                        })
                    }}>
                    送给女孩一朵玫瑰🌹
                </Text>
                <View style={{height:10}}/>
                <Text style={styles.text}>{this.state.backGift}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    }
})