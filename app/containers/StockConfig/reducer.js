/*
 *
 * Stock config reducer
 *
 */
import produce from 'immer';
import { GET_STOCK_CONFIG, GET_STOCK_CONFIG_SUCCESS } from './constants';

export const initialState = {
  data: [],
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const chatReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_STOCK_CONFIG:
        draft.data = [];
        draft.loading = true;
        break;
      case GET_STOCK_CONFIG_SUCCESS:
        draft.data = action.payload;
        draft.loading = false;
        break;
    }
  });

export default chatReducer;
