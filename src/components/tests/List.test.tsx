import * as React from 'react'
import { shallow } from 'enzyme'

import List from '../List'
const s = require('./List.css')


describe('<List />', () => {
  it('should render', () => {
    const list = shallow(<List><div /></List>)
    expect(list.length).toBeTruthy()
    expect(list.prop('className')).toBe(s.list)
  })

  it('should render empty', () => {
    const list = shallow(<List empty={<span />}/>)
    expect(list.length).toBeTruthy()
    expect(list.find('span').length).toBe(1)
  })
})
