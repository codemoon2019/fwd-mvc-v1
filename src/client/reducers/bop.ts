import { Reducer } from 'redux';
import { BOP } from '../interface/BOP/BOP';
import { FETCH_BOP_REQUEST, FETCH_BOP_SUCCESS, FETCH_BOP_FAILURE } from '../http/bop/type';

export interface BOPState {
  bopList: any;
  loading: boolean;
  error: string | null;
}

const initialState: BOPState = {
  bopList: [],
  loading: false,
  error: null
};

export const bopReducer: Reducer<BOPState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_BOP_SUCCESS:
      return {
        ...state,
        loading: false,
        bopList: action.payload
      };
    case FETCH_BOP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};