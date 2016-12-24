import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

const Root = (props) => {
    const { store, history, routes } = props;
    return (
        <Provider store={store}>
            <Router
                history={history}
                routes={routes}
                render={
                    // Scroll to top when going to a new page, imitating default browser
                    // behaviour
                    applyRouterMiddleware(useScroll())
                }
            />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object,
    routes: PropTypes.any.isRequired,
};

export default Root;
