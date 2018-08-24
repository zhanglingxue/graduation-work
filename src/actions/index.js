import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import * as schemes from '../schema';

function fetchLogin(mid) {
  return {
    LOGIN_API: {
      type: ActionTypes.FETCH_LOGIN,
      params: {
        mid
      },
      success: res => {
        this.fetchMyMusicList(res.token);
        this.fetchRecommendMusicList(res.token);
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

function fetchDeleteMusic(array) {
  return {
    type: ActionTypes.FETCH_DELETE_MUSIC,
    array
  };
}
function fetchSubmitMusicName(id, value) {
  return {
    type: ActionTypes.FETCH_SUBMIT_MUSIC_NAME,
    id,
    value
  };
}
function fetchMarkStart(time, idx) {
  return {
    type: ActionTypes.FETCH_MARK_START,
    time,
    idx
  };
}
export {
  fetchLogin,
  fetchMyMusicList,
  fetchRecommendMusicList,
  fetchDeleteMusic,
  fetchSubmitMusicName,
  fetchMarkStart
};
