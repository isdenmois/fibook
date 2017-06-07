export default function map(array: Array<any>, func: any) {
  if (array) {
    return array.map(func)
  }
  return []
}
