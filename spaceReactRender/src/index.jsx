/*jshint esversion: 6 */

import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import Errorpage from './errorpage';

import { Provider } from "react-redux";  //We render the provider that provide the store to React.
import store from "./store"; //Where we initialise the Store structure.

render(<provider store={store}> <App/> </provider>, document.querySelector('#app'));
// render(<Errorpage />, document.getElementById('app'));
