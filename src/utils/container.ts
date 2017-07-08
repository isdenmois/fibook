import * as React from 'react'
const hoistStatics = require('hoist-non-react-statics')


export function container(containerComponent: React.ComponentClass<any>): ClassDecorator {
  return function (component: Function): any {
    const resultComponent: any = (props: any) => React.createElement(
      containerComponent,
      {...props, view: component}
    )
    resultComponent.displayName = `${getName(containerComponent)}(${getName(component)})`

    return hoistStatics(hoistStatics(resultComponent, containerComponent), component)
  }
}

export function renderView(origProps: ContainerBaseProps, addProps: Object = null): React.ReactElement<any> {
  const props = {...origProps, ...addProps}
  delete props.view

  return React.createElement(origProps.view as any, props)
}

export interface ContainerBaseProps {
  view?: React.ReactType
}

const getName = (component: any) => component.displayName || component.name
