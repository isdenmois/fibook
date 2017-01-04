/**
 * The entities selectors.
 */
import { createSelector } from 'reselect';
import { selectStatus } from './list';

export const selectGlobal = state => state.entities;

export const selectBooks = createSelector(
    selectGlobal,
    entities => entities.get('book'),
);

export const selectBookEntities = createSelector(
    selectBooks,
    selectStatus,
    (books, status) => {
        if (books) {
            return books
                .filter(data => +data.get('status') === +status)
                .sort((a, b) => b.get('LastAccess') - a.get('LastAccess'))
                .toArray();
        }

        return [];
    },
);
