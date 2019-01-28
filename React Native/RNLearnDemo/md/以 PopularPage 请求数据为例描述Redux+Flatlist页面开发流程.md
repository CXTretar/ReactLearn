

以 PopularPage 请求数据为例描述Redux+Flatlist页面开发流程 

1、在`action`文件夹中的`types.js`中添加新的类型 `POPULAR_REFRESH` `LOAD_POPULAR_FAIL` `LOAD_POPULAR_SUCCESS`。

2、 在`action`文件夹中创建`popular`文件夹，并且在`popular`文件夹中创建`index.js`文件，在`index.js`文件中写入`onLoadPopularData`以及`handleData`实现方法。 

```javascript
import Types from '../types'
import DataStoreA from '../../expand/dao/DataStoreA'

/**
 * 获取最热数据的异步action
 * @param storeName // 指的是具体的某种编程语言,例如iOS, Android
 * @returns {Function}
 */
export function onLoadPopularData(storeName) {
    // 返回一个异步acton
    return dispatch => {

        // 下拉时做一些操作,比如loading控件显示之类
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName,
        });

        let dataStore = new DataStoreA();
        dataStore.fetchData(url) // 异步action与数据流
            .then(data => {
                handleData(dispatch, storeName, data)
            })
            .catch(error => {
                error && console.log(error.toString());
                dispatch({
                    type:Types.LOAD_POPULAR_FAIL,
                    storeName,  // 等价于 storeName: storeName,
                    error,
                })
            })
    }
}

/* 请求数据成功,进行数据处理 */
function handleData(dispatch, storeName, data) {
    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName: storeName,
    })
}
```

并且在`action`目录下的`index.js`文件中聚合`onLoadPopularData`方法。

```javascript
import {onThemeChange} from './theme';
import {onLoadPopularData} from "./popular";

export default {
    onThemeChange,
    onLoadPopularData,
}
```



3、在`reducer`文件夹中创建`popular`文件夹，并且在`popular`文件夹中创建`index.js`文件，在`index.js`文件中写入第二步设置的`action`的`reducer`方法。

```javascript
import Types from '../../action/types'

const defaultState = {};
/**
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false,
 *     },
 *     ios:{
 *         items:[],ios
 *         isLoading:false,
 *     }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key 设置为 [action.storeName] 为不固定)；
 * @param state
 * @param action
 * @returns {{}}
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS: {
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    items:action.items,
                    isLoading:false,
                },
            };

        }
        case Types.POPULAR_REFRESH: {
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:true,
                },
            }
        }
        case Types.LOAD_POPULAR_FAIL: {
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:false,
                },
            }
        }

        default:
            return state;
    }

}
```

在reducer目录下的index.js文件中聚合popular的reducer方法。

```javascript
import { combineReducers } from 'redux'
import theme from './theme'
import popular from './popular'
import {rootCom, RootNavigator} from "../navigator/AppNavigator";

/**
 * 1.指定默认state
 */


// console.log(RootNavigator);
// const { router } = RootNavigator;

const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));
// debugger;
// console.log(navState);
/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    theme: theme,
    popular: popular,
});

export default index;
```

4、在`page`文件夹下对`PopularPage.js`文件进行绑定`state`以及`action`, 通过对this.props中的绑定`state (popular)`以及绑定`action (onLoadPopularData)`来对界面进行数据请求处理以及UI渲染。

```javascript
const mapStateToProps = state => ({
    popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
```