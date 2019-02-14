import {AsyncStorage} from 'react-native'

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {

    constructor(flag) {

        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
    }

    /**
     * 收藏项目,保存收藏的项目
     * @param key 项目id
     * @param value 收藏的项目
     * @param callback
     */
    saveFavoriteItem(key, value, callback) {

        AsyncStorage.setItem(key, value, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, true)
            }
        });

    }

    /**
     * 更新Favorite key集合
     * @param key
     * @param isAdd true 添加,false 删除
     * **/
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result); //  JSON.parse() 将 String数据转换为 JavaScript 对象
                }

                let index = favoriteKeys.indexOf(key); //如果要检索的字符串值没有出现，则该方法返回 -1。
                if (isAdd) {
                    if (index === -1) {
                        favoriteKeys.push(key); // 向数组的末尾添加一个或更多元素，并返回新的长度,也就是添加
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index, 1); // 删除元素，并向数组添加新元素, 也就是更新 arrayObject.splice(index,howmany,item1,.....,itemX)
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys)); //  JSON.stringify() 将 JavaScript 对象转换为 String 数据
            }
        })

    }

    /**
     * 获取收藏的Repository对应的key
     * @return {Promise}
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * 取消收藏,移除已经收藏的项目
     * @param key 项目 id
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, false);
            }
        });
    }

    /**
     * 获取所以收藏的项目
     * @return {Promise}
     */
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys()
                .then((keys) => {
                    let items = [];
                    if (keys) {
                        // 获取 keys 所包含的所有字段的值，其回调函数会传入一个 key-value 数组形式的数组：multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
                        AsyncStorage.multiGet(keys, (error, stores) => {
                            try {
                                stores.map((result, i, store) => {
                                    let key = store[i][0];
                                    let value = store[i][1];
                                    if (value) {
                                        items.push(JSON.parse(value));
                                    }
                                });
                                resolve(items);
                            } catch (e) {
                                reject(e);
                            }
                        })
                    } else {
                        resolve(items);
                    }
                })
                .catch((e) => {
                    reject(e);
                })
        })
    };


}