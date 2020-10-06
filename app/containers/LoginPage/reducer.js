/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN, LOGIN_OK } from './constants';

export const initialState = { user: {}, loading: true };

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.data = {};
        draft.loading = true;
        break;
      case LOGIN_OK:
        draft.data = action.payload;
        draft.loading = false;
        break;
    }
  });

export default loginPageReducer;
