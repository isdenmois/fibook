/**
 * Book list selectors.
 */
import { createSelector } from 'reselect';

export const selectList = state => state.list;

export const selectStatus = createSelector(
    selectList,
    list => list.get('status'),
);

