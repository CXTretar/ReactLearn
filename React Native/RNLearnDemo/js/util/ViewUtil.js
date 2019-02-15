import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ViewUtil {

    /**
     * 获取左侧返回按钮
     * @param callback
     * @returns {XML}
     */
    static getLeftBackButton(callback) {
        return <TouchableOpacity
            style={{padding: 8, paddingLeft: 12}}
            onPress={callback}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}
            />
        </TouchableOpacity>

    }

    /**
     * 获取分享按钮
     * @param callback
     * @returns {XML}
     */
    static getShareButton(callback) {
        return <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={callback}
        >
            <Ionicons
                name={'md-share'}
                size={20}
                style={{opacity: 0.9, marginRight: 10, color: 'white'}}
            />
        </TouchableOpacity>
    }

    /**
     * 获取设置页的Item
     * @param callback 单击item的回调
     * @param text 显示的文本
     * @param color 图标着色
     * @param Icons react-native-vector-icons组件
     * @param icon  左侧图标
     * @param expandableIcon 右侧图标
     * @returns {*}
     */
    static getSettingItem(callback, text, color, Icons, icon, expandableIcon) {
        return <TouchableOpacity
            style={styles.setting_item_container}
            onPress={callback}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Icons
                    name={icon}
                    size={16}
                    style={{
                        marginRight: 10,
                        color: color,
                    }}
                />
                <Text>
                    {text}
                </Text>
            </View>
            <Ionicons
                name={expandableIcon ? expandableIcon : 'ios-arrow-forward'}
                size={16}
                style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    color: color || 'black',
                }}
            />

        </TouchableOpacity>
    }

    /**
     * 获取设置页的Item
     * @param callback 单击item的回调
     * @param menu @MenuTypes
     * @param color 图标着色
     * @param expandableIcon 右侧图标
     * @returns {*}
     */
    static getMenuItem(callback, menu, color, expandableIcon) {
       return this.getSettingItem(callback, menu.name, color, menu.Icons, menu.icon, expandableIcon);
    }
}

const styles = StyleSheet.create({
    setting_item_container:{
        backgroundColor:'white',
        padding: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});