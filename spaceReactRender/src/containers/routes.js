// Index will load the Router to see where we land.
// Router dosent want ot load all different app, but want to load the landing Home page.
import React from 'react';
import { Route } from 'react-router';
import App from './app.jsx';
import CostCalculation from './costCalculation.jsx';

import HomePage from './homepage';

export default <div>
  <Route path="/mars" component={App}></Route>
  <Route path="/cost" component={CostCalculation}></Route>
  <Route path="/" component={HomePage}>
  </Route>;
</div>
