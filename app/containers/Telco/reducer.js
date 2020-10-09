import produce from 'immer';

import { GET_TELCO, GET_TELCO_SUCCESS } from './constants';

// The initial state of the App
export const initialState = {
  telco: [],
};

/* eslint-disable default-case, no-param-reassign */
const telcoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TELCO:
        draft.telco = [];
        draft.loadingMenu = true;
        break;
      case GET_TELCO_SUCCESS:
        draft.telco = action.payload;
        break;
    }
  });

export default telcoReducer;
