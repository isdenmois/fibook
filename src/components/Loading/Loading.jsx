import React from 'react';
import { ProgressCircular } from 'react-onsenui';

import { loading } from './Loading.scss';

function Loading() {
    return (
        <div className={loading}>
            <ProgressCircular indeterminate />
        </div>
    );
}

export default Loading;
