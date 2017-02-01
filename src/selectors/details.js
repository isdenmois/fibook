/**
 * The details selectors.
 */
import { createSelector } from 'reselect';

export const selectDetails = state => state.details;

export const selectLoading = createSelector(
    selectDetails,
    details => details.get('loading'),
);

export const selectError = createSelector(
    selectDetails,
    details => details.get('error'),
);
