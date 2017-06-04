export interface FetchStore {
  setFetching: (fetching: boolean) => void
  setData: (prop: string, data: any) => void
}
