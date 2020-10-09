import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.telco || initialState;

const makeSelectTelco = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.telco,
  );

export { selectGlobal, makeSelectTelco };
