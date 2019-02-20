import {AsyncStorage} from 'react-native'
import ThemeFactory, {ThemeFlags} from '../../../res/styles/ThemeFactory'

const THEME_KEY = 'theme_key';

export default class ThemeDao {
    /**
     * 保存主题标识
     * @param themeFlag
     */
    saveTheme(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag);
    }

    /**
     * 获取当前主题
     * @returns {Promise<any> | Promise<*>}
     */
    getTheme() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_KEY, (error, themeFlag) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!themeFlag) {
                    themeFlag = ThemeFlags.Default;
                    this.saveTheme(themeFlag);
                }
                resolve(ThemeFactory.createTheme(themeFlag));
            });
        });
    };


}