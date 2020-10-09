import { GET_TELCO, GET_TELCO_SUCCESS } from './constants';

export function getTelco(ws, dispatch) {
  return {
    type: GET_TELCO,
    ws,
    dispatch,
  };
}

export function getTelcoSuccess(payload) {
  return {
    type: GET_TELCO_SUCCESS,
    payload,
  };
}
