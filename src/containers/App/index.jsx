/**
 * App.react.js
 */
import React, { PropTypes } from 'react';

function App(props) {
    return (
        <div>
            {React.Children.toArray(props.children)}
        </div>
    );
}

App.propTypes = {
    children: PropTypes.node,
};

export default App;
