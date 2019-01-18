/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SwipeableFlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

const CITY_NAMES = ['北京', '广州', '上海', '厦门', '杭州', '深圳', '成都', '武汉', '福州'];

export default class SwipeableFlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES,
        }

    }

    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true,
            });
        }

        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES);
            }

            this.setState({
                dataArray: dataArray,
                isLoading: false,
            })
        }, 2000);
    }

    _renderItem(data) {
        return <View style={styles.item}>
            <Text style={styles.text}>{data.item}</Text>
        </View>
    }

    genIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                color={'blue'}
                size={'large'}
                active={true}
            />
            <Text>上拉加载更多</Text>
        </View>
    }

    genQuickActions() {
        return <View style={styles.quickContainer}>
            <TouchableHighlight
                onPress={()=>{
                    alert('确认删除?')
                }
                }
            >
                <View style={styles.quick}>
                    <Text style={styles.text}>删除</Text>
                </View>
            </TouchableHighlight>

        </View>
    }


    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    renderItem={(data) => this._renderItem(data)}
                    data={this.state.dataArray}
                    // 默认下拉刷新组件
                    //
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData()
                    // }}
                    // 自定义下拉刷新组件
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={['red']}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true)
                            }}
                        />
                    }

                    ListFooterComponent={() => (this.genIndicator())}
                    onEndReached={() => {
                        this.loadData(false)
                    }}

                    renderQuickActions={() => (this.genQuickActions())}
                    maxSwipeDistance={100}
                    bounceFirstRowOnMount={false}
                    // initialNumToRender={}
                    // keyExtractor={}
                    // numColumns={}
                    // getItem={}
                    // getItemCount={}
                    // disableVirtualization={}
                    // maxToRenderPerBatch={}
                    // updateCellsBatchingPeriod={}
                    // windowSize={}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        backgroundColor: '#169',
        height: 100,
        margin: 15,
        // marginRight: 15,
        // marginLeft: 15,
        // marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
    quickContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 15,
        // marginRight: 15,
        // marginLeft: 15,
        // marginBottom: 15,
        // backgroundColor: 'red',
    },
    quick: {
        flex: 1,
        backgroundColor: 'red',
        alignItems:'flex-end',
        justifyContent:'center',
        padding:10,
        width:200,
    }
});
