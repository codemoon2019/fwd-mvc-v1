import { combineReducers } from 'redux'
import bopReducer from './reducer/bopReducer'

export default combineReducers({
  bop: bopReducer
})