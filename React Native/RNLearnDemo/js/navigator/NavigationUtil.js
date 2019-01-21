/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {

    /**
     * 返回首页
     * @param params
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main');
    }

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('navigation can not be null');
            return;
        }
        navigation.navigate(page, {...params});
    }

}