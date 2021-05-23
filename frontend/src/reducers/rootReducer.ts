import { combineReducers } from "redux";

import misc, { MiscDux } from "reducers/miscDux";

export interface RootState {
  misc: MiscDux;
}

const rootReducer = combineReducers({ misc });

export default rootReducer;
