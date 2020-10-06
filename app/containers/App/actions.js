/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { GET_MENU, GET_MENU_SUCCESS, GET_MENU_ERROR } from './constants';

export function getMenu(ws, dispatch) {
  return {
    type: GET_MENU,
    ws,
    dispatch,
  };
}

export function getMenuSuccess(payload) {
  return {
    type: GET_MENU_SUCCESS,
    payload,
  };
}

export function getMenuError(error) {
  return {
    type: GET_MENU_ERROR,
    error,
  };
}
