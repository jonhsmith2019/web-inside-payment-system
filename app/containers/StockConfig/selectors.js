import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chat state domain
 */

const selectChatDomain = state => state.stockConfig || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Chat
 */

const makeSelectChat = () =>
  createSelector(
    selectChatDomain,
    substate => substate,
  );

export default makeSelectChat;
export { selectChatDomain };
