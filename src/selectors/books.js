/**
 * The books selectors.
 */
import { createSelector } from 'reselect';

export const selectGlobal = () => (state) => state.get('global');

export const selectLoading = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('loading')
);

export const selectError = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('error')
);
