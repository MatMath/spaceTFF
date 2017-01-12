import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from "react-redux";  //We render the provider that provide the store to React.

import App from './app.jsx';
import Errorpage from './errorpage';

import reducer from './reducers'
const store = createStore(reducer)

// import store from "./store"; //Where we initialise the Store structure.
// IMPORTANT: The Provider tag need to be in separate lines otherwise you will have a impossible error to find.
// Error generated if it is on 1 line: Failed prop type: Invalid prop `children` of type `array` supplied to `Provider`, expected a single ReactElement. in Provider
if (false) {
  render(
    <Provider store={store}>
      <app />
    </Provider>,
    document.getElementById('root')
  )
} else {
  render(
    <Provider store={store}>
      <Errorpage />
    </Provider>,
    document.getElementById('root')
  )
}
