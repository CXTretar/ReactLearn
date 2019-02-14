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
 *
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key不固定)；
 * @param state
 * @param action
 * @returns {{}}
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH: { // 下拉刷新时
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            }
        }
        case Types.POPULAR_REFRESH_SUCCESS: { // 下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModels: action.projectModels,//此次要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                },
            };

        }
        case Types.POPULAR_REFRESH_FAIL: {  // 下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            }
        }
        case Types.POPULAR_LOAD_MORE_SUCCESS: { // 上拉加载成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            }
        }
        case Types.POPULAR_LOAD_MORE_FAIL: {  // 上拉加载完成
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            }
        }
        case Types.FLUSH_POPULAR_FAVORITE:{//刷新收藏状态
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                }
            }
        }

        default:
            return state;
    }

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