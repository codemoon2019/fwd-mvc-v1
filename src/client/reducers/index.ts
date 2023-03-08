import { combineReducers } from 'redux';
import { bopReducer } from './bop';
// import other reducers if you have them

const rootReducer = combineReducers({
  bopList: bopReducer,
});

export default rootReducer;


