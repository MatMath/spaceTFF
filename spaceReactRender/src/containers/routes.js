// Index will load the Router to see where we land.
// Router dosent want ot load all different app, but want to load the landing Home page.
import React from 'react';
import { Route } from 'react-router';
import App from './app.jsx';
// import GraphSection from './graphSection.jsx';
import HomePage from './homepage';

export default <div>
  <Route path="/mars" component={App}></Route>
  {/* <GraphSection /> */}
  <Route path="/" component={HomePage}>
  </Route>;
</div>
