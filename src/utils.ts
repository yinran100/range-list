import { NumberArray } from './types'

/**
 * binary search
  @param {NumberArray} array - sorted array to be searched
  @param {number} target - target number
  @return {number} index of target number in array (-1 ~ arr.length -1)
 */ 
export function binarySearch (arr: NumberArray, num: number): number {
  let left = 0
  let right = arr.length
  while (left <= right) {
    const center = Math.floor((left + right) / 2)
    if (num < arr[center]) {
      right = center - 1
    } else {
      left = center + 1
    }
  }
  right = Math.min(right, arr.length - 1)
  return right
}
