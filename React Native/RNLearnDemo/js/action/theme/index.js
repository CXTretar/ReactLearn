import Types from '../types'
import ThemeDao from "../../expand/dao/ThemeDao";

/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme) {
    return {
        type: Types.THEME_CHANGE,
        theme: theme,
    }
}

/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
    return dispatch => {
        new ThemeDao().getTheme()
            .then((theme) => {
                dispatch(onThemeChange(theme));
            })
    }
}

/**
 * 显示或者隐藏自定义主题浮层
 * @param show 显示或者隐藏
 * @returns {{customThemeViewVisible: *, type: string}}
 */
export function onShowCustomThemeView(show) {
    return {
        type: Types.SHOW_THEME_VIEW,
        customThemeViewVisible: show,
    }

}