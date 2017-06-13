import * as React from 'react'
const InlineSVG = require('svg-inline-react')

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
