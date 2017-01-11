import { combineReducers } from "redux";

import param from "./paramReducer"
import data from "./dataReducer"

const storeData = combineReducers({ param, data });

export default storeData;
