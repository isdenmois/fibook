import * as React from 'react'
import { shallow } from 'enzyme'

import { Button } from '../button'
const s = require('../style/button.css')

describe('<Button />', () => {
  it('should render', () => {
    const component = shallow(<Button positive dangerous onClick={() => {}} />)

    expect(component.length).toBeTruthy()
    expect(component.hasClass(s.positive))
    expect(component.hasClass(s.dangerous))
  })
})
