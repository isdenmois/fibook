import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppComponent from '../containers/App';
import HomePageComponent from '../containers/HomePage';
import BookPageComponent from '../containers/BookPage';

export default () => (
    <AppComponent>
        <BrowserRouter>
            <div>
                <Route path="/" component={HomePageComponent} />
                <Route path="/book/:MD5" component={BookPageComponent} />
            </div>
        </BrowserRouter>
    </AppComponent>
);
