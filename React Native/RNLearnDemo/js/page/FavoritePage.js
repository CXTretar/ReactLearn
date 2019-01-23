import React, {Component} from 'react';
import {Platform, StyleSheet, Image, SafeAreaView, Text, View, Button} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

export class FavoritePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.homePage}>FavoritePage</Text>
                <Button title={'改变主题颜色'} onPress={() => {
                    this.props.onThemeChange('green')
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

export default connect(mapStateToProps,mapDispatchToProps)(FavoritePage);