import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { BookPage } from "pages/BookPage/components/BookPage";
import { HomePage } from "pages/HomePage/components/HomePage";

import AppComponent from "containers/App";

export default () => (
  <AppComponent>
    <BrowserRouter>
      <div>
        <Route path="/" component={HomePage as any} />
        <Route path="/book/:MD5" component={BookPage as any} />
      </div>
    </BrowserRouter>
  </AppComponent>
);
