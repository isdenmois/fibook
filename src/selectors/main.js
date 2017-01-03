/**
 * The entities selectors.
 */
import { createSelector } from 'reselect';

export const selectMain = state => state.main;

export const selectLoading = createSelector(
    selectMain,
    main => main.get('loading'),
);

export const selectError = createSelector(
    selectMain,
    main => main.get('error'),
);
