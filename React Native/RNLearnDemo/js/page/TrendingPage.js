import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View, Button} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index'

export class TrendingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.homePage}>TrendingPage</Text>
                <Button title={'改变主题颜色'} onPress={() => {
                    this.props.onThemeChange('red')
                    // navigation.setParams({
                    //     theme: {
                    //         tintColor: 'red',
                    //         updateTime: new Date().getTime(),
                    //     }
                    // })
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage);