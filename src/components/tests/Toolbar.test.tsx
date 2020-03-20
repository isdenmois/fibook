import * as React from 'react'
import { shallow } from 'enzyme'

import { Toolbar } from '../toolbar'

describe('<Toolbar />', () => {
  it('should render', () => {
    const component = shallow(<Toolbar title='super-toolbar' />)
    expect(component.length).toBeTruthy()
  })
})
