
export interface Book {
  MD5: string
  title: string
  author: string
  lastRead: string
  status: number
  progress: string
  size: number
}


export interface BookHistory {
  date: string
  pages: number
  percent: number
  progress: string
  speed: number
  time: number
}
