import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BookPage from 'BookPage/components/BookPage';
import HomePage from 'HomePage/components/HomePage';

import AppComponent from '../containers/App';

export default () => (
    <AppComponent>
        <BrowserRouter>
            <div>
                <Route path="/" component={HomePage} />
                <Route path="/book/:MD5" component={BookPage} />
            </div>
        </BrowserRouter>
    </AppComponent>
);
