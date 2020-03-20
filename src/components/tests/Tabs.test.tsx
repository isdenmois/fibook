import * as React from 'react'
import { shallow } from 'enzyme'

import Tabs, { TabData } from '../Tabs'

describe('<Tabs />', () => {
  it('should render', () => {
    const data: TabData[] = [
      {
        title: 'super-tab-1',
        content: <div />,
        icon: '',
        activeIcon: '',
      },
    ]

    const component = shallow(<Tabs name='super-tab' data={data} />)
    expect(component.length).toBeTruthy()
  })
})
