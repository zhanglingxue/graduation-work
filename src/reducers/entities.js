import * as ActionTypes from '../const/ActionTypes';

export default function Entities(state = {}, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_MY_MUSIC_LIST}_SUC`: {
      const newState = { ...state };
      const entities = action.response.entities.list;
      return {
        ...newState,
        ...entities
      };
    }
    case `${ActionTypes.FETCH_RECOMMEND_MUSIC_LIST}_SUC`: {
      const newState = { ...state };
      const entities = action.response.entities.list;
      return {
        ...newState,
        ...entities
      };
    }
    case ActionTypes.FETCH_SUBMIT_MUSIC_NAME: {
      const newState = { ...state };
      newState[action.id].name = action.value;
      return newState;
    }
    default: {
      return state;
    }
  }
}

