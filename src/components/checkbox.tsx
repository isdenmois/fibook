import * as React from 'react'
const s = require('./style/checkbox.css')

export function Checkbox({ value, onChange, children }) {
  const onChangeFn = React.useCallback(() => onChange(!value), [value])

  return (
    <label className={s.label}>
      <input type='checkbox' onClick={onChangeFn} />
      <i></i>
      <span>{children}</span>
    </label>
  )
}
