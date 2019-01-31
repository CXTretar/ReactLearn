/*
* 三种离线缓存策略
*
* a. 优先从本地获取数据,如果数据过时或者不存在则从服务器获取数据,数据返回后同时将数据同步到本地数据库.
*
* b. 优先从服务器获取数据,数据返回后同时将数据同步到本地数据库,如果网络故障则从服务器获取数据,.
*
* c. 同时从本地和服务器获取数据,如果本地数据库返回数据则先展示本地数据,等网络数据加载回来后再展示网络数据同时将数据同步到本地数据库.
*
* */

/*
* 此处为离线缓存策略 a 的封装
* */

import {AsyncStorage} from 'react-native';
import Trending from 'GitHubTrending';

export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};

export default class DataStore {

    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @param flag 用来判断是 popular 界面还是 trending 界面的网络请求
     * @returns {Promise}
     */
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            // 先从本地数据获取数据
            this.fetchLocalData(url)
                .then((wrapData) => {
                    // 判断数据是否存在,并且是否在有效期内
                    if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                        resolve(wrapData);
                    } else {
                        // 假如本地数据库数据为空或者过期,则通过网络请求获取数据
                        this.fetchNetData(url, flag)
                            .then((data) => {
                                resolve(this._wrapData(data));
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    // 假如本地数据库获取数据出现异常,则通过网络请求获取数据
                    this.fetchNetData(url, flag)
                        .then((data) => {
                            resolve(this._wrapData(data));
                        })
                        .catch((error => {
                            reject(error);
                        }))
                })
        })
    }

    /**
     * 保存数据, 将 Object 转化成 String 类型保存, 方便取用
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */

    fetchLocalData(url) {
        // 返回一个 Promise 对象, 方便之后的使用
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    // 解析本地存储的Json字符串格式的数据,成功就返回Json对象,失败则返回错误
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })

        });

    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchNetData(url, flag) {
        // 返回一个 Promise 对象, 方便之后的使用
        return new Promise((resolve, reject) => {
            // 获取网络数据,假如响应失败则抛出异常,在获取到网络数据的同时,通过 saveData 方法同步到本地数据库
            if (flag === FLAG_STORAGE.flag_popular) {
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then((responseData) => {
                        // 获得responseData之后,保存到本地数据库
                        this.saveData(url, responseData);
                        resolve(responseData);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            } else {
                new Trending().fetchTrending(url)
                    .then((items) => {
                        if (!items) {
                            throw new Error('responseData is null');
                        }
                        this.saveData(url, items);
                        resolve(items);

                    }).catch((error) => {

                    reject(error);
                });
            }

        })
    }

    /**
     * 生成一个带时间戳的数据
     * @param data
     */
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 检查timestamp是否在有效期内  静态方法,类似于OC中的类方法
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;//有效期4个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}