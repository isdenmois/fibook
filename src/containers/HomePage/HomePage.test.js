import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { fromJS } from 'immutable';

import ConnectedHomePage, { HomePage } from './index';

describe('<HomePage /> component', () => {
    const createNewBook = jest.fn();
    const deleteBook = jest.fn();
    const updateBookStatus = jest.fn();

    it('should render', () => {
        const newBook = fromJS({
            book1: {
                MD5: 'book1',
                author: 'test author',
                title: 'test',
                status: 0,
                thumbnail: '',
            }
        });
        const readBook = fromJS({
            book2: {
                MD5: 'book2',
                author: 'test author 2',
                title: 'test title 2',
                status: 1,
                thumbnail: '',
            }
        });

        const wrapper = shallow(
            <HomePage
                createNewBook={createNewBook}
                deleteBook={deleteBook}
                updateBookStatus={updateBookStatus}
                newBooks={newBook}
                readBooks={readBook}
            />
        );

        const listItem = wrapper.find({primaryText: "test title 2"});
        expect(listItem.node).toBeDefined();
    });

    it('should render loading component', () => {
        const wrapper = shallow(
            <HomePage
                createNewBook={createNewBook}
                deleteBook={deleteBook}
                updateBookStatus={updateBookStatus}
                loading
            />
        );

        const loading = wrapper.find('Loading');
        expect(loading.node).toBeDefined();
    });
});
