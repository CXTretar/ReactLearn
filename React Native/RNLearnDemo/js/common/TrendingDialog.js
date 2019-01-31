import React, {Component} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity, DeviceInfo} from 'react-native';
import TimeSpan from '../model/TimeSpan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const TimeSpans = [new TimeSpan('今 天', 'since=daily'), new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')];
export default class TrendingDialog extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    state = {
        visible: false,
    };

    show() {
        this.setState({
            visible: true,
        })
    }

    dismiss() {
        this.setState({
            visible: false,
        })
    }

    render(): React.ReactNode {
        const {onClose, onSelect} = this.props;
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => onClose}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.dismiss()}
            >
                <MaterialIcons
                    name={'arrow-drop-up'}
                    size={36}
                    style={styles.arrow}
                />
                <View style={styles.content}>
                    {
                        TimeSpans.map((result, i, array) => {
                            return <TouchableOpacity
                                key={i}
                                onPress={() => onSelect(array[i])}
                                underlayColor='transparent'
                            >
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        {
                                            array[i].showText
                                        }
                                    </Text>
                                </View>
                                {
                                    i !== TimeSpans.length - 1 ? <View
                                        style={styles.line}
                                    /> : null
                                }
                            </TouchableOpacity>

                        })
                    }
                </View>

            </TouchableOpacity>
        </Modal>);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        alignItems: 'center',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -15
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
});