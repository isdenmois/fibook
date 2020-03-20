import * as React from 'react'
import { shallow } from 'enzyme'
import { InlineSvg } from '../inline-svg'

describe('<Svg/>', () => {
  it('should render svg', () => {
    const element = shallow(<InlineSvg src='<svg>abc</svg>' />)
    expect(element.name()).toBe('i')
  })
})
