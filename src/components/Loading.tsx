import * as React from 'react'

import InlineSVG from './InlineSvg'

const s = require('./style/loading.css')
const svg = require('./style/loading.svg')

function Loading() {
    return (
        <div className={s.loading}>
            <InlineSVG className="loading" src={svg}/>
        </div>
    )
}

export default Loading
