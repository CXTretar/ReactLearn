/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList, RefreshControl, ActivityIndicator} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

const CITY_NAMES = [{
    data: ['北京', '广州', '上海', '深圳'],
    title: '一线城市',
}, {
    data: ['成都', '武汉', '杭州'],
    title: '二、三线城市1',
}, {
    data: ['厦门', '福州'],
    title: '二、三线城市2',
}];

export default class SectionListDemo extends Component<Props> {
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

    _renderSectionHeader({section}) {
        return <View style={styles.sectionHeaderContainer}>
            <Text>{section.title}</Text>
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
                <SectionList
                    sections={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
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

                    renderSectionHeader={(data) => this._renderSectionHeader(data)}
                    ItemSeparatorComponent={()=>(<View style={styles.separator}/>)}
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
        backgroundColor: '#fff',
        height: 150,
        // margin: 15,
        // marginRight: 15,
        // marginLeft: 15,
        // marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
    sectionHeaderContainer: {
        height: 50,
        backgroundColor: '#93ebbe',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        flex: 1,
    }
});
