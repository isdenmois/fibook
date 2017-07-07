import * as React from 'react'
import { shallow } from 'enzyme'

import Loading from '../Loading'
const s = require('../Loading/Loading.css')


describe('<Loading />', () => {
  it('should rendering', () => {
    const node = shallow(<Loading />)
    expect(node).toBeDefined()
    expect(node.prop('className')).toBe(s.loading)
  })
})
