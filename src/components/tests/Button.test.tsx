import * as React from 'react'
import { shallow } from 'enzyme'

import { Button } from '../button'

describe('<Button />', () => {
  it('should render', () => {
    const component = shallow(<Button onClick={() => {}} />)
    expect(component.length).toBeTruthy()
  })
})
