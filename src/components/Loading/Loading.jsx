import React from 'react';
import InlineSVG from 'svg-inline-react';

import css from './Loading.css';
import svg from './Loading.svg';

function Loading() {
    return (
        <div className={css.loading}>
            <InlineSVG
                className="loading"
                src={svg}
            />
        </div>
    );
}

export default Loading;
