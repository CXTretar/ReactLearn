import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'
import {handleData} from '../ActionUtil'

/**
 * 获取最热数据的异步action
 * @param storeName // 指的是具体的某种编程语言,例如iOS, Android
 * @returns {Function}
 */
export function onRefreshTrending(storeName, url, pageSize) {
    // 返回一个异步acton
    return dispatch => {

        // 下拉时做一些操作,比如loading控件显示之类
        dispatch({
            type: Types.TRENDING_REFRESH,
            storeName: storeName,
        });

        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_trending) // 异步action与数据流
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
            })
            .catch(error => {
                error && console.log(error.toString());
                dispatch({
                    type: Types.TRENDING_REFRESH_FAIL,
                    storeName,  // 等价于 storeName: storeName,
                    error,
                })
            })
    }
}


export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    // 返回一个异步acton
    return dispatch => {
        setTimeout(() => { // 模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { // 比较上次已经加载完的数据和源数组的大小来判断是否全部加载完成, 全部加载完成在这里等于加载更多失败
                if (typeof callBack === 'function') { // 判断 callBack 是否是一个function
                    callBack('no more data');
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    storeName,
                    pageIndex: --pageIndex, // 模拟请求的时候做了+1操作,现在让他做-1操作复位到最大的pageIndex
                    error: 'no more data',
                    projectModels: dataArray,
                })

            } else { // 请求成功返回当前Index的子数组
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex; //本次和载入的最大数量, 假如是最大数量则展示最大数量的子数组
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModels: dataArray.slice(0, max),
                })
            }
        }, 500)
    }
}

