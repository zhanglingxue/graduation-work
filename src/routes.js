import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import CraduationWork from './containers/GraduationWork';

const AppRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={CraduationWork} />
  </Route>
);

export default AppRoutes;
