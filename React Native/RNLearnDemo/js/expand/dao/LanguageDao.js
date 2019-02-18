import {AsyncStorage} from 'react-native'
import keys from '../../../res/data/keys';
import langs from '../../../res/data/langs'

export const FLAG_LANGUAGE = {flag_key: 'language_dao_key', flag_language: 'language_dao_language'};

export default class LanguageDao {

    constructor(flag) {

        this.flag = flag;
    }

    /**
     * 获取语言或标签
     * @returns {Promise<any> | Promise<*>}
     */
    fetchData() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                }
                // 假如本地数据不存在,读取json文件数据,并且保存到本地数据库
                if (!result) {
                    let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : langs;
                    this.save(data);
                    resolve(data);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    }catch (e) {
                        console.log(e);
                        reject(e);
                    }
                }
            });
        });
    }

    /**
     * 保存语言或标签
     * @param objectData
     */
    save(objectData){
        let stringData = JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag, stringData);
    }

}