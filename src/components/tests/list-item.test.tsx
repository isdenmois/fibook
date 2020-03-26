import * as React from 'react'
import { shallow } from 'enzyme'

import { ListItem } from '../list-item'
const s = require('../style/list-item.css')

describe('<ListItem />', () => {
  it('should render', () => {
    const component = shallow(<ListItem />)
    expect(component.length).toBeTruthy()
    expect(component.find(`.${s.center}`).length).toBe(1)
  })

  it('should render right part', () => {
    const component = shallow(<ListItem right='123' />)
    expect(component.find(`.${s.right}`).length).toBe(1)
  })
})
