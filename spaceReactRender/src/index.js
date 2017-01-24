// Libraries
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';  //We render the provider that provide the store to React.

// Code
import App from './containers/app.jsx';
import Errorpage from './containers/errorpage';
import GraphSection from './containers/graphSection.jsx';

// Redux Store
import store from './store';

// IMPORTANT: The Provider tag need to be in separate lines otherwise you will have a impossible error to find.
// Error generated if it is on 1 line: Failed prop type: Invalid prop `children` of type `array` supplied to `Provider`, expected a single ReactElement. in Provider
if (true) {
  // TODO: Make Error hook work but where and from where? Routing?
  render(
    <Provider store={store}>
      <div>
        <App />
        <GraphSection />
      </div>
    </Provider>,
    document.getElementById('root')
  );
} else {
  render(
    <Provider store={store}>
      <Errorpage />
    </Provider>,
    document.getElementById('root')
  );
}
