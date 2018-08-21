import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MyMusic from './containers/topBar/myMusic';
import SearchMusic from './containers/topBar/searchMusic';
import UploadMusic from './containers/topBar/uploadMusic';

const AppRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={MyMusic} />
    <Route path="search-music" component={SearchMusic} />
    <Route path="upload-music" component={UploadMusic} />
  </Route>
);

export default AppRoutes;
