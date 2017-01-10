import { combineReducers } from "redux";

import param from "./paramReducer"
import data from "./dataReducer"

export default combineReducers({
  param, data
})
