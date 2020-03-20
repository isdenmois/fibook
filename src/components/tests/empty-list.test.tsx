import * as React from 'react'
import { shallow } from 'enzyme'
import { EmptyList } from '../empty-list'

describe('<EmptyList />', () => {
  it('should render', () => {
    const wrapper = shallow(<EmptyList />)

    expect(wrapper).toBeDefined()
  })
})
