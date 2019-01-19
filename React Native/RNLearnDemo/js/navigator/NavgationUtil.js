/**
 * 全局导航跳转工具类
 */
export default class NavgationUtil {

    /**
     * 返回首页
     * @param params
     */
    static resetToHomePage (params) {
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

}