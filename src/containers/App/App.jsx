/**
 * App.react.js
 */
import React from 'react';

export default function App(props) {
    return (
        <div className="ios">
            {props.children}
        </div>
    );
}
