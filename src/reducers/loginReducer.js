import * as ActionTypes from '../const/ActionTypes';

const init_state = {
  res: {
    token: ''
  }
};

export default function todoList(state = init_state, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_LOGIN}_SUC`: {
      const res = action.response;
      return {
        ...state,
        res
      };
    }
    default: {
      return state;
    }
  }
}
