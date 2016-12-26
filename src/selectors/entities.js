/**
 * The entities selectors.
 */
import { createSelector } from 'reselect';

export const selectGlobal = () => state => state.entities;

export const selectBookEntities = () => createSelector(
    selectGlobal(),
    globalState => globalState.get('book'),
);
