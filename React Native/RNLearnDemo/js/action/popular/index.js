import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

/**
 * 获取最热数据的异步action
 * @param storeName // 指的是具体的某种编程语言,例如iOS, Android
 * @returns {Function}
 */
export function onRefreshPopular(storeName, url, pageSize) {
    // 返回一个异步acton
    return dispatch => {

        // 下拉时做一些操作,比如loading控件显示之类
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName,
        });

        let dataStore = new DataStore();
        dataStore.fetchData(url) // 异步action与数据流
            .then(data => {
                handleData(dispatch, storeName, data, pageSize)
            })
            .catch(error => {
                error && console.log(error.toString());
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName,  // 等价于 storeName: storeName,
                    error,
                })
            })
    }
}


export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    // 返回一个异步acton
    return dispatch => {
        setTimeout(() => { // 模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { // 比较上次已经加载完的数据和源数组的大小来判断是否全部加载完成, 全部加载完成在这里等于加载更多失败
                if (typeof callBack === 'function') { // 判断 callBack 是否是一个function
                    callBack('no more data');
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    storeName,
                    pageIndex: --pageIndex, // 模拟请求的时候做了+1操作,现在让他做-1操作复位到最大的pageIndex
                    error: 'no more data',
                    projectModels: dataArray,
                })

            } else { // 请求成功返回当前Index的子数组
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex; //本次和载入的最大数量, 假如是最大数量则展示最大数量的子数组
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModels: dataArray.slice(0, max),
                })
            }
        }, 500)
    }
}

/* 请求数据成功,进行数据处理 */
/**
 *
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据,根据设置的pageSize来判断,不能超过fixItems的长度
        items: fixItems,
        storeName: storeName,
        pageIndex: 1, // 初始的时候Index为1
    })
}

// 数据样例
/*
* {
  "total_count": 987198,
  "incomplete_results": false,
  "items": [
    {
      "id": 63477660,
      "node_id": "MDEwOlJlcG9zaXRvcnk2MzQ3NzY2MA==",
      "name": "Java",
      "full_name": "TheAlgorithms/Java",
      "private": false,
      "owner": {
        "login": "TheAlgorithms",
        "id": 20487725,
        "node_id": "MDEyOk9yZ2FuaXphdGlvbjIwNDg3NzI1",
        "avatar_url": "https://avatars1.githubusercontent.com/u/20487725?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/TheAlgorithms",
        "html_url": "https://github.com/TheAlgorithms",
        "followers_url": "https://api.github.com/users/TheAlgorithms/followers",
        "following_url": "https://api.github.com/users/TheAlgorithms/following{/other_user}",
        "gists_url": "https://api.github.com/users/TheAlgorithms/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/TheAlgorithms/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/TheAlgorithms/subscriptions",
        "organizations_url": "https://api.github.com/users/TheAlgorithms/orgs",
        "repos_url": "https://api.github.com/users/TheAlgorithms/repos",
        "events_url": "https://api.github.com/users/TheAlgorithms/events{/privacy}",
        "received_events_url": "https://api.github.com/users/TheAlgorithms/received_events",
        "type": "Organization",
        "site_admin": false
      },
      "html_url": "https://github.com/TheAlgorithms/Java",
      "description": "All Algorithms implemented in Java",
      "fork": false,
      "url": "https://api.github.com/repos/TheAlgorithms/Java",
      "forks_url": "https://api.github.com/repos/TheAlgorithms/Java/forks",
      "keys_url": "https://api.github.com/repos/TheAlgorithms/Java/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/TheAlgorithms/Java/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/TheAlgorithms/Java/teams",
      "hooks_url": "https://api.github.com/repos/TheAlgorithms/Java/hooks",
      "issue_events_url": "https://api.github.com/repos/TheAlgorithms/Java/issues/events{/number}",
      "events_url": "https://api.github.com/repos/TheAlgorithms/Java/events",
      "assignees_url": "https://api.github.com/repos/TheAlgorithms/Java/assignees{/user}",
      "branches_url": "https://api.github.com/repos/TheAlgorithms/Java/branches{/branch}",
      "tags_url": "https://api.github.com/repos/TheAlgorithms/Java/tags",
      "blobs_url": "https://api.github.com/repos/TheAlgorithms/Java/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/TheAlgorithms/Java/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/TheAlgorithms/Java/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/TheAlgorithms/Java/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/TheAlgorithms/Java/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/TheAlgorithms/Java/languages",
      "stargazers_url": "https://api.github.com/repos/TheAlgorithms/Java/stargazers",
      "contributors_url": "https://api.github.com/repos/TheAlgorithms/Java/contributors",
      "subscribers_url": "https://api.github.com/repos/TheAlgorithms/Java/subscribers",
      "subscription_url": "https://api.github.com/repos/TheAlgorithms/Java/subscription",
      "commits_url": "https://api.github.com/repos/TheAlgorithms/Java/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/TheAlgorithms/Java/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/TheAlgorithms/Java/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/TheAlgorithms/Java/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/TheAlgorithms/Java/contents/{+path}",
      "compare_url": "https://api.github.com/repos/TheAlgorithms/Java/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/TheAlgorithms/Java/merges",
      "archive_url": "https://api.github.com/repos/TheAlgorithms/Java/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/TheAlgorithms/Java/downloads",
      "issues_url": "https://api.github.com/repos/TheAlgorithms/Java/issues{/number}",
      "pulls_url": "https://api.github.com/repos/TheAlgorithms/Java/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/TheAlgorithms/Java/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/TheAlgorithms/Java/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/TheAlgorithms/Java/labels{/name}",
      "releases_url": "https://api.github.com/repos/TheAlgorithms/Java/releases{/id}",
      "deployments_url": "https://api.github.com/repos/TheAlgorithms/Java/deployments",
      "created_at": "2016-07-16T10:21:02Z",
      "updated_at": "2019-01-28T03:48:05Z",
      "pushed_at": "2019-01-27T22:20:29Z",
      "git_url": "git://github.com/TheAlgorithms/Java.git",
      "ssh_url": "git@github.com:TheAlgorithms/Java.git",
      "clone_url": "https://github.com/TheAlgorithms/Java.git",
      "svn_url": "https://github.com/TheAlgorithms/Java",
      "homepage": null,
      "size": 1007,
      "stargazers_count": 10134,
      "watchers_count": 10134,
      "language": "Java",
      "has_issues": true,
      "has_projects": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 3910,
      "mirror_url": null,
      "archived": false,
      "open_issues_count": 85,
      "license": null,
      "forks": 3910,
      "open_issues": 85,
      "watchers": 10134,
      "default_branch": "master",
      "score": 121.78253
    },]*/