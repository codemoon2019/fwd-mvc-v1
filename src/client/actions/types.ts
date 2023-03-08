export interface BOP {
  name: string;
  venue: string;
  date: string;
}

export enum ActionTypes {
  FETCH_BOP_REQUEST = 'FETCH_BOP_REQUEST',
  FETCH_BOP_SUCCESS = 'FETCH_BOP_SUCCESS',
  FETCH_BOP_FAILURE = 'FETCH_BOP_FAILURE',
}

export interface FetchBOPRequestAction {
  type: ActionTypes.FETCH_BOP_REQUEST;
}

export interface FetchBOPSuccessAction {
  type: ActionTypes.FETCH_BOP_SUCCESS;
  payload: BOP[];
}

export interface FetchBOPFailureAction {
  type: ActionTypes.FETCH_BOP_FAILURE;
  error: string;
}

export type BOPAction =
  | FetchBOPRequestAction
  | FetchBOPSuccessAction
  | FetchBOPFailureAction;