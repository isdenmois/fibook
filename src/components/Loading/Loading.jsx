import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import { loading } from './Loading.scss';

function Loading(props) {
    return (
        <div className={loading}>
            <CircularProgress {...props} />
        </div>
    );
}

export default Loading;
