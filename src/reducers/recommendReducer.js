import * as ActionTypes from '../const/ActionTypes';

export default function todoList(state = [], action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_RECOMMEND_MUSIC_LIST}_SUC`: {
      const newState = { ...state };
      const result = action.response.result;
      return {
        ...newState,
        ...result
      };
    }
    default: {
      return state;
    }
  }
}
