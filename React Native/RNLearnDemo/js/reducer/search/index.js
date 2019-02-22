import Types from '../../action/types'

const defaultState = {
    showText: '搜索',    // 搜素框右侧按钮显示文本
    items: [],          // 源数据
    projectModels: [],  // 要显示的数据
    isLoading: false,
    hideLoadingMore: true,
    showBottomButton: false,
    pageIndex: 0,
};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.SEARCH_REFRESH: { // 下拉刷新时
            return {
                ...state,
                isLoading: true,
                hideLoadingMore: true,
                showBottomButton: false,
                showText: '取消',
            }
        }
        case Types.SEARCH_REFRESH_SUCCESS: { // 下拉刷新成功
            return {
                ...state,
                isLoading: false,
                hideLoadingMore: false,
                showBottomButton: action.showBottomButton,
                items: action.items,
                projectModels: action.projectModels,
                pageIndex: action.pageIndex,
                inputKey: action.inputKey,
                showText: '搜索',
            };

        }
        case Types.SEARCH_FAIL: {  // 下拉刷新失败
            return {
                ...state,
                isLoading: false,
                showText: '搜索',
            }
        }
        case Types.SEARCH_LOAD_MORE_SUCCESS: { // 搜索上拉加载成功
            return {
                ...state,
                projectModels: action.projectModels,
                hideLoadingMore: false,
                pageIndex: action.pageIndex,
            }
        }
        case Types.SEARCH_LOAD_MORE_FAIL: {  // 搜索上拉加载完成
            return {
                ...state,
                hideLoadingMore: true,
                pageIndex: action.pageIndex,
            }
        }
        case Types.SEARCH_CANCEL: {//搜索取消
            return {
                ...state,
                isLoading: false,
                showText: '搜索',
            }
        }
        case Types.SEARCH_SAVE_KEY: {
            return {
                ...state,
                showText: '搜索',    // 搜素框右侧按钮显示文本
                items: [],          // 源数据
                projectModels: [],  // 要显示的数据
                isLoading: false,
                hideLoadingMore: true,
                showBottomButton: false,
                pageIndex: 0,
                inputKey: null,
            };
        }

        default:
            return state;
    }

}
