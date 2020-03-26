import * as React from 'react'
import { shallow } from 'enzyme'

import { Loading } from '../loading'
const s = require('../styles/loading.css')

describe('<Loading />', () => {
  it('should rendering', () => {
    const node = shallow(<Loading />)
    expect(node).toBeDefined()
    expect(node.prop('className')).toBe(s.loading)
  })
})
