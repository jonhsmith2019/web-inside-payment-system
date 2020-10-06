/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import { GET_MENU, GET_MENU_SUCCESS, GET_MENU_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  menu: [],
  loadingMenu: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MENU:
        draft.menu = [];
        draft.loadingMenu = true;
        break;
      case GET_MENU_SUCCESS:
        draft.menu = action.payload;
        draft.loadingMenu = false;
        break;
      case GET_MENU_ERROR:
        draft.menu = [];
        draft.loadingMenu = false;
        break;
    }
  });

export default appReducer;
