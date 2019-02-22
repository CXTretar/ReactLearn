import Types from '../types'
import ArrayUtil from '../../util/ArrayUtil'
import {_projectModels, doCallBack, handleData} from '../ActionUtil'
import Utils from "../../util/Utils";

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const CANCEL_TOKENS = [];

function getFetchUrl(key) {
    return API_URL + key + QUERY_STR;
}

function hasCancel(token, isRemove) {
    if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
        return true;
    }
    return false;
}


/**
 * 发起搜索
 * @param inputKey     搜索key
 * @param pageSize
 * @param token        与该搜索关联的唯一token
 * @param favoriteDao
 * @param popularKeys
 * @param callback
 * @returns {Function}
 */
export function onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callback) {
    // 返回一个异步acton
    return dispatch => {
        dispatch({
            type: Types.SEARCH_REFRESH,
        });

        fetch(getFetchUrl(inputKey))
            .then(response => {
                return hasCancel(token) ? null : response.json();
            })
            .then(responseData => {
                if (hasCancel(token, true)) {
                    console.log('user cancel');
                    return;
                }
                if (!responseData || !responseData.items || responseData.items.length === 0) {
                    dispatch({
                        type: Types.SEARCH_FAIL,
                        message: `没找到关于${inputKey}的项目`,
                    });
                    doCallBack(callback, `没找到关于${inputKey}的项目`);
                    return;
                }

                let items = responseData.items;
                handleData(Types.SEARCH_REFRESH_SUCCESS, dispatch, '', {data: items}, pageSize, favoriteDao, {
                    showBottomButton: !Utils.checkKeyIsExist(popularKeys, inputKey),
                    inputKey
                });
            })
            .catch(e => {
                console.log(e);
                dispatch({
                    type: Types.SEARCH_FAIL,
                    error: e,
                })
            })
    };
}

/**
 * 上拉加载更多
 * @param pageIndex     第几页
 * @param pageSize      每页展示条数
 * @param dataArray     原始数据
 * @param favoriteDao
 * @param callBack      回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {Function}
 */
export function onLoadMoreSearch(pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    // 返回一个异步acton
    return dispatch => {
        setTimeout(() => { // 模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { // 比较上次已经加载完的数据和源数组的大小来判断是否全部加载完成, 全部加载完成在这里等于加载更多失败
                if (typeof callBack === 'function') { // 判断 callBack 是否是一个function
                    callBack('no more data');
                }
                dispatch({
                    type: Types.SEARCH_LOAD_MORE_FAIL,
                    pageIndex: --pageIndex, // 模拟请求的时候做了+1操作,现在让他做-1操作复位到最大的pageIndex
                    error: 'no more data',
                })

            } else { // 请求成功返回当前Index的子数组
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex; //本次和载入的最大数量, 假如是最大数量则展示最大数量的子数组

                _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels: projectModels,
                    })
                })
            }
        }, 500)
    }
}


/**
 * 取消一个异步任务
 * @param token
 * @returns {function(*)}
 */
export function onSearchCancel(token) {
    return dispatch => {
        CANCEL_TOKENS.push(token);
        dispatch({type: Types.SEARCH_CANCEL});
    }
}

export function onSaveSearchKey() {
    return dispatch => {
        dispatch({type: Types.SEARCH_SAVE_KEY});
    }

}