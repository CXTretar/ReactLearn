

/* 请求数据成功,进行数据处理 */
/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
export function handleData(actionType, dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }
    }

    dispatch({
        type: actionType,
        projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据,根据设置的pageSize来判断,不能超过fixItems的长度
        items: fixItems,
        storeName: storeName,
        pageIndex: 1, // 初始的时候Index为1
    })
}
