import React, {Component} from 'react';
import {Modal, StyleSheet, Text, View, TouchableHighlight, DeviceInfo, ScrollView,Platform} from 'react-native';
import ThemeDao from '../expand/dao/ThemeDao';
import ThemeFactory, {ThemeFlags} from '../../res/styles/ThemeFactory';
import GlobalStyles from '../../res/styles/GlobalStyles';
import {connect} from "react-redux";
import actions from '../action/index'

export class CustomThemePage extends Component {
    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();
    }

    onSelectTheme(themeKey) {
        this.props.onClose();
        this.themeDao.saveTheme(ThemeFlags[themeKey]);
        const {onThemeChange} = this.props;
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]));
    }

    getThemeItem(themeKey) {
        return (
            <TouchableHighlight
                style={{flex: 1}}
                underlayColor={'white'}
                onPress={() => {
                    this.onSelectTheme(themeKey)
                }}
            >
                <View style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItem]}>
                    <Text style={styles.themeText}>
                        {themeKey}
                    </Text>
                </View>

            </TouchableHighlight>
        )
    }

    /**
     * 搭建九宫格视图
     * @returns {*}
     */
    renderThemeItems() {
        const views = [];
        /**
         * Object.keys(ThemeFlags) = [Default, Red, Pink,...], 即返回对象的key的数组
         */
        for (let i = 0, keys = Object.keys(ThemeFlags), len = keys.length; i < len; i += 3) {
            const key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }

    renderContentView() {
        return (
            <View style={GlobalStyles.root_container}>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => {
                        this.props.onClose()
                    }}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            {this.renderThemeItems()}
                        </ScrollView>
                    </View>

                </Modal>
            </View>)
    }

    render(): React.ReactNode {
        return this.props.visible ? this.renderContentView() : null;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomThemePage);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }

});