import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import serverApi from '../middleware/serverApi';
import loginApi from '../middleware/loginApi';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, loginApi, serverApi)
);

export default configureStore;
