import * as React from 'react'
import { createBook } from 'services/book'
import bookDataParser from 'utils/book-data'
const s = require('./style/upload.css')

export interface FileUploaderProvider {
  upload(files: File[]): Promise<void>
}

export const FileUploaderContext = React.createContext<FileUploaderProvider>(null)

const titles = {
  UPLOAD: 'Загрузка',
  HAS_ERRORS: 'Загружено с ошибками',
  FINISH: 'Загружено',
  WAITS: 'Ожидает',
  PARSE: 'Парсинг',
}

interface IFileLine {
  id: string
  title: string
  progress: number | string
  error?: string
}

interface State {
  type: string
  files: IFileLine[]
}

export class FileUploader extends React.Component<any, State> implements FileUploaderProvider {
  state: State = {
    type: null,
    files: [],
    // files: [
    //   {
    //     id: 'stephen.king.temnaya.bashnya',
    //     title: 'stephen.king.temnaya.bashnya',
    //     progress: 100,
    //   },
    //   {
    //     id: 'oldos',
    //     title: 'Олдос Хаксли. О дивный новый мир',
    //     progress: 70,
    //     error: 'The storage is full',
    //   },
    //   {
    //     id: 'yod',
    //     title: 'Элиезер Юдковский. Гарри Поттер и методы рационального мышления',
    //     progress: 'PARSE',
    //   },
    //   {
    //     id: 'sam',
    //     title: 'Сэмюел Дилэни. Вавилон-17',
    //     progress: 'WAITS',
    //   },
    // ],
  }

  render() {
    return (
      <FileUploaderContext.Provider value={this.ctx}>
        {this.state.type && this.renderScreen()}
        {this.props.children}
      </FileUploaderContext.Provider>
    )
  }

  renderScreen() {
    const { type, files } = this.state

    return (
      <div className={s.page}>
        <div className={s.title}>{titles[type]}</div>
        {type === 'HAS_ERRORS' && (
          <div className={s.result}>
            {files.length} загружено, {files.filter(f => f.error).length} с ошибкой
          </div>
        )}

        <div className={s.files}>
          {files.map(file => (
            <FileLine key={file.id} file={file}></FileLine>
          ))}
        </div>

        {type !== 'UPLOAD' && (
          <div className={s.button} onClick={this.finish}>
            Продолжить
          </div>
        )}
      </div>
    )
  }

  createInitialState(files: File[]) {
    return new Promise(resolve =>
      this.setState({ type: 'UPLOAD', files: files.map(f => ({ id: f.name, title: f.name, progress: 0 })) }, resolve),
    )
  }

  upload = async (files: File[]) => {
    await this.createInitialState(files)

    for (let i = 0; i < files.length; i++) {
      try {
        await this.uploadBook(i, files[i])
      } catch (e) {
        this.setData(i, { error: e?.responseText || e?.toString() })
      }
    }

    const type = this.state.files.some(f => f.error) ? 'HAS_ERRORS' : 'FINISH'

    this.setState({ type })
  }

  finish = () => this.setState({ type: null, files: [] })

  async uploadBook(index: number, f: File) {
    this.setProgress(index, 'PARSE')

    const { author, image, imageName, title, file, fileName } = await bookDataParser(f)

    this.setData(index, { title: author ? `${author}. ${title}` : title })

    await createBook({ file: file || f, author, image, imageName, title, fileName }, ev =>
      this.setProgress(index, (ev.loaded / ev.total) * 100),
    )

    this.setProgress(index, 101)
  }

  setProgress(index: number, progress: number | string) {
    const file = this.state.files[index]
    progress = typeof progress === 'number' ? Math.round(progress) : progress

    if (progress !== file.progress) {
      this.state.files[index] = { ...file, progress }

      this.setState({ files: [...this.state.files] })
    }
  }

  setData(index: number, data: Partial<IFileLine>) {
    this.state.files[index] = { ...this.state.files[index], ...data }

    this.setState({ files: [...this.state.files] })
  }

  ctx: FileUploaderProvider = { upload: this.upload }
}

const FileLine = React.memo(({ file }: { file: IFileLine }) => {
  return (
    <div className={s.file}>
      <div className={s.fileTitle}>{file.title}</div>
      {!file.error && titles[file.progress] && <div className={s.info}>{titles[file.progress]}</div>}
      {!file.error && !titles[file.progress] && (
        <div
          className={file.progress > 100 ? `${s.progress} ${s.progress_done}` : s.progress}
          style={{ '--progress': `${file.progress}%` } as any}
        ></div>
      )}
      {file.error && <div className={s.error}>{file.error}</div>}
    </div>
  )
})
