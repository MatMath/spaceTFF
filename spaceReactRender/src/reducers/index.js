import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import baseParam from './paramReducer';
import calculatedData from './dataReducer';

const storeData = combineReducers({ baseParam, calculatedData, routing });

export default storeData;
