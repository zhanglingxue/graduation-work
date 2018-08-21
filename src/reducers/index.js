import { combineReducers } from 'redux';
import entities from './entities';
import myMusicReducer from './myMusicReducer';
import recommendReducer from './recommendReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  entities,
  myMusicReducer,
  recommendReducer,
  loginReducer
});
