/*jshint esversion: 6 */

import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import Errorpage from './errorpage';

// fallback is the server dosent answer
var fetchedParam = {
  persPerShip: 100,
  engineMalfunction: 0.01,
  refuilingDefect: 0.02,
  landingFaillure: 0.05,
  reusabilityOfShip: 5,
  improvement: 0.05,
  firstStageEngine: 42,
  itsEngine: 9,
  touristRatio: 0.3,
  orbitRefulling: 4,
  probIncreaseProdOfIts: 0,
  itsIncreaseOf: 1
};
const HTTP_SERVER = 'http://localhost:1701';


var startTheApp = () => {

  var getParamList = () => {
    console.log('fetching param');
    fetch(HTTP_SERVER+'/param',{
      method: 'GET',
      ContentType: 'json'
    })
    .then(function(res) {
      // This return the header call of the function, not the data.
      return res.json();
    })
    .then(function(data){
      // console.log('Got the ParamList', data);
      if (data.persPerShip) {
        fetchedParam = data;
      }
      render(<App param={fetchedParam}/>, document.querySelector('#app'));
    })
    .catch(function(ex) {
      // Fail to fetch so keep using the default value.
        window.console.log('parsing failed', ex);
        ReactDOM.render(<Errorpage />, document.getElementById('app'));
      })
  }


  getParamList();
}
startTheApp();
