/**
 * The entities selectors.
 */
import { createSelector } from 'reselect';

export const selectGlobal = state => state.entities;

export const selectBooks = createSelector(
    selectGlobal,
    entities => entities.get('book'),
);

export const selectDetails = createSelector(
    selectGlobal,
    entities => entities.get('details'),
);

export const selectNewBooks = createSelector(
    selectBooks,
    (books) => {
        if (books) {
            return books
                .filter((data) => {
                    const status = data.get('status');
                    return +status === 0 || status === undefined;
                }).toArray()
                .sort((a, b) => b.get('LastModified') - a.get('LastModified'));
        }

        return [];
    },
);

const filterReadBooks = createSelector(
    selectBooks,
    (books) => {
        if (books) {
            return books
                .filter(data => +data.get('status') === 1)
                .toArray();
        }

        return [];
    },
);

export const selectReadBooks = createSelector(
    filterReadBooks,
    books => books
        .sort((a, b) => b.get('LastAccess') - a.get('LastAccess')),
);
