import * as React from 'react'
import { shallow } from 'enzyme'

import Page from '../page'

describe('<Page />', () => {
  it('should render', () => {
    const component = shallow(<Page name='super-page' />)
    expect(component.length).toBeTruthy()
    expect(component.find('[data-page="super-page"]')).toHaveLength(1)
  })
})
