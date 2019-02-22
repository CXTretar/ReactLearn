import ProjectModel from '../model/ProjectModel'
import Utils from '../util/Utils'

/* 请求数据成功,进行数据处理 */
/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param favoriteDao
 * @param pageSize
 */
export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao,params) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }
    }

    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize); // 第一次要加载的数据,根据设置的pageSize来判断,不能超过fixItems的长度
    _projectModels(showItems, favoriteDao, projectModels => {
        dispatch({
            type: actionType,
            projectModels: projectModels,
            items: fixItems,
            storeName: storeName,
            pageIndex: 1, // 初始的时候Index为1
            ...params,
        })
    });
}

/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */
export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        //获取收藏的key 使用 async-await 来异步转同步
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        console.log(e);
    }

    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
    }

    doCallBack(callback,projectModels);

}

/**
 * callback的统一判断function调用
 * @param callback
 * @param object
 */
export function doCallBack(callback, object) {
    if (typeof callback === 'function') {
        callback(object);
    }
}