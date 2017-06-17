function compareBy(array: any[], field: string, max: boolean): any {
  let result
  if (array.length === 0) {
    return null
  }
  result = array[0][field]

  for (const value of array) {
    if (max && value[field] > result) {
      result = value[field]
    } else if (!max && value[field] < result) {
      result = value[field]
    }
  }

  return result
}

export const minBy = (array: any, field: string):any => compareBy(array, field, false)
export const maxBy = (array: any, field: string):any => compareBy(array, field, true)
