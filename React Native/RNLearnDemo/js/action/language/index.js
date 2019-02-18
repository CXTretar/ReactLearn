import Types from '../types'
import LanguageDao from "../../expand/dao/LanguageDao";

export function onLoadLanguageData(flagKey) {
    // 返回一个异步acton
    return async dispatch => {

        try {
            let languages = await new LanguageDao(flagKey).fetchData();
            dispatch({
                type: Types.LANGUAGE_LOAD_SUCCESS,
                flag: flagKey,
                languages: languages,
            })
        } catch (e) {
            console.log(e);
        }
    }
}
