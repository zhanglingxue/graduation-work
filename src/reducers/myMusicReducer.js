import * as ActionTypes from '../const/ActionTypes';

export default function todoList(state = [], action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_MY_MUSIC_LIST}_SUC`: {
      const newState = [...state];
      const result = action.response.result;
      return [
        ...newState,
        ...result
      ];
    }
    case ActionTypes.FETCH_DELETE_MUSIC: {
      const newState = [...state];
      for (let i = 0; i < action.array.length; i++) {
        const index = newState.indexOf(action.array[i]);
        newState.splice(index, 1);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
}

