/**
 * The entities selectors.
 */
import { createSelector } from 'reselect';
import { List } from 'immutable';

export const selectGlobal = () => state => state.entities;

export const selectBookEntities = () => createSelector(
    selectGlobal(),
    globalState => globalState.get('book'),
);

export const selectBooksByType = type => createSelector(
    selectGlobal(),
    (globalState) => {
        const books = globalState.get('book');
        if (books) {
            return books
                .filter(data => data.get('status') === type)
                .sort((a, b) => b.get('LastAccess') - a.get('LastAccess'));
        }

        return new List();
    },
);
