import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import * as schemes from '../schema';

function fetchLogin(mid) {
  return {
    LOGIN_API: {
      type: ActionTypes.FETCH_LOGIN,
      params: {
        mid
      }
    }
  };
}
function fetchMyMusicList(token) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_MY_MUSIC_LIST,
      endpoint: '/my_list',
      params: {
        token
      },
      normailzerFun: response => normalize(response.list, schemes.LIST)
    }
  };
}
function fetchRecommendMusicList(token) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_RECOMMEND_MUSIC_LIST,
      endpoint: '/recommend_list',
      params: {
        token
      },
      normailzerFun: response => normalize(response.list, schemes.LIST)
    }
  };
}


export {
  fetchLogin,
  fetchMyMusicList,
  fetchRecommendMusicList
};
