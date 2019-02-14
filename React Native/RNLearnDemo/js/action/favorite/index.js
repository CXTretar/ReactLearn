import Types from '../types'
import FavoriteDao from "../../expand/dao/FavoriteDao";
import ProjectModel from "../../model/ProjectModel";

/**
 * 加载收藏的项目
 * @param flag 标识
 * @param isShowLoading 是否显示loading
 * @returns {Function}
 */
export function onLoadFavoriteData(flag, isShowLoading) {
    // 返回一个异步acton
    return dispatch => {

        // 下拉时做一些操作,比如loading控件显示之类, false 时不显示下拉刷新
        if (isShowLoading) {
            dispatch({
                type: Types.FAVORITE_LOAD_DATA,
                storeName: flag,
            });
        }

        let favoriteDao = new FavoriteDao(flag);
        favoriteDao.getAllItems()
            .then(items => {
                let resultData = [];
                for (let i = 0, len = items.length; i < len; i++) {
                    resultData.push(new ProjectModel(items[i], true));
                }
                dispatch({
                    type: Types.FAVORITE_LOAD_SUCCESS,
                    storeName: flag,
                    projectModels: resultData,
                })
            })
            .catch((e) => {
                console.log(e);
                dispatch({
                    type: Types.FAVORITE_LOAD_FAIL,
                    storeName: flag,
                    error: e,
                })
            })
    }
}
