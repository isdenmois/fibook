
export interface Book {
  MD5: string
  title: string
  author: string
  lastRead: string
  status: number
  progress: string
  size: number
  LastAccess: number
  LastModified: number
  location: string
  startRead: number
  endRead: number
  readTime: number
  thumbnail: string
}

export interface BookHistory {
  date: string
  pages: number
  percent?: number
  progress?: string
  speed?: number
  time: number
}

export interface RawHistory {
  date: string
  progress: string
  time: string
}
