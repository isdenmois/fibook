import * as React from 'react'

const s = require('./style/fileInput.css')

interface Props {
  name: string
  accept?: string
  onFileSelect: (file: File[]) => void
}

export class FileInput extends React.PureComponent<Props> {
  static defaultProps = { accept: '.fb2,.fb2.zip,.epub' }

  render() {
    const { name, accept, children } = this.props

    return (
      <div className={s.wrapper}>
        <input className={s.input} type='file' multiple name={name} onChange={this.onChange} accept={accept} />
        <div className={s.icon}>{children}</div>
      </div>
    )
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target

    if (target.files.length) {
      const files: File[] = []

      for (let i = 0; i < target.files.length; i++) {
        files[i] = target.files[i]
      }

      target.value = ''

      this.props.onFileSelect(files)
    }
  }
}
