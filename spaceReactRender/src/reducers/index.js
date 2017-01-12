import { combineReducers } from "redux";

import baseParam from "./paramReducer"
import calculatedData from "./dataReducer"

const storeData = combineReducers({ baseParam, calculatedData });

export default storeData;
