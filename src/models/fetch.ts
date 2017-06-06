export interface FetchStore {
  setFetching: (fetching: boolean) => void
  setData: (prop: string, data: any) => void
  setLoadMore?: (prop: string, loadMore: boolean) => void
  appendData?: (prop: string, data: any) => void
  setTotal?: (prop: string, count: number) => void
}
