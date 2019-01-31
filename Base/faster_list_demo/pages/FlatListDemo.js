/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

const CITY_NAMES = ['北京', '广州', '上海', '厦门', '杭州', '深圳', '成都', '武汉', '福州'];

export default class FlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: [],
        }

    }

    componentDidMount(): void {
        this.loadData(true)
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
                for (let i = CITY_NAMES.length - 1; i >= 0; i--) {
                    dataArray.push(CITY_NAMES[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES);
            }

            this.setState({
                dataArray: dataArray,
                isLoading: false,
            })
        }, 5000);
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

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{backgroundColor: 'red'}}
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
        height: 200,
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
    }
});
