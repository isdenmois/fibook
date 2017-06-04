import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BookPage from 'BookPage/components/BookPage';

import AppComponent from '../containers/App';
import HomePageComponent from '../containers/HomePage';

export default () => (
    <AppComponent>
        <BrowserRouter>
            <div>
                <Route path="/" component={HomePageComponent} />
                <Route path="/book/:MD5" component={BookPage} />
            </div>
        </BrowserRouter>
    </AppComponent>
);
