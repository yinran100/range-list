// index.test.ts

import assert from 'assert'
import RangeList from '../src'
import { NumberArray } from '../src/types'
import { randomRange, getRandomInteger } from './utils'

function logRange (arr) {
  const res = arr.map(item => `[${item.join(', ')})`).join(' ')
  // console.log(res)
  return res
}
const MIN = 1
const MAX = 3999
// Gather test data，increase the effectiveness of the test
const RANGE_LENGTH = getRandomInteger(MIN, MAX)
const RANGE = getRandomInteger(0, 30)
const TEST_TIME = 200 // Math.floor(RANGE_LENGTH / RANGE * 0.85)
const getRandomRange = () => {
  return randomRange(getRandomInteger(RANGE, RANGE * 2), 0, RANGE_LENGTH)
}

// is the number in the interval array
function numberInRanges (arr: NumberArray[], num: number) {
  arr = arr.filter(item => item[0] !== item[1])
  return arr.some(item => num >= item[0] && num < item[1])
}


describe('validate:', () => {
  /**
   * RangeList
   */
  describe('test: RangeList.add', () => {
    test('print expected results：', () => {
      const rl = new RangeList()
      const addRangeList: NumberArray[] = []

      for (let i = 0; i < TEST_TIME; i++) {
        console.log('add', i + 1, TEST_TIME)
        // The scope of each range should not be too large
        const range = getRandomRange()
        rl.add(range)
        addRangeList.push(range)

        const min = addRangeList.reduce((prev, curr) => prev[0] < curr[0] ? prev : curr)[0]
        const max = addRangeList.reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)[1]

        const res = Array.from({
          length: max - min + 1,
        }).reduce((prev: NumberArray[], _, index) => {
          const curr = index + min

          const inRange = numberInRanges(addRangeList, curr)

          if(inRange) {
            if (prev.length === 0 ) {
              prev.push([curr, curr + 1])
              return prev
            }
            if (prev[prev.length - 1][1] === curr){
              prev[prev.length - 1][1] = curr + 1
            } else {
              prev.push([curr, curr + 1])
            }
          }
          return prev
        }, [])
        // console.log('addRangeList =>', JSON.stringify(addRangeList))
        assert.strictEqual(rl.print(), logRange(res))
      }
    })
  })

  describe('test: RangeList.remove', () => {
    test('print expected results：', () => {
      const rl = new RangeList()
      const removedRangeList: NumberArray[] = []
      // initial
      const min = getRandomInteger(0, 100)
      const max = getRandomInteger(5000, 8000)
      const range = [min, max + 1]
      rl.add(range)
      for (let i = 0; i < TEST_TIME; i++) {
        console.log('removed', i + 1, TEST_TIME)
        // The scope of each range should not be too large
        const range = getRandomRange()
        rl.remove(range)
        removedRangeList.push(range)

        const res = Array.from({
          length: max - min + 1,
        }).reduce((prev: NumberArray[], _, index) => {
          const curr = index + min

          const outRange = !numberInRanges(removedRangeList, curr)

          if(outRange) {
            if (prev.length === 0 ) {
              prev.push([curr, curr + 1])
              return prev
            }
            if (prev[prev.length - 1][1] === curr){
              prev[prev.length - 1][1] = curr + 1
            } else {
              prev.push([curr, curr + 1])
            }
          }
          return prev
        }, [])
        // console.log('removedRangeList =>', JSON.stringify(removedRangeList))
        assert.strictEqual(rl.print(), logRange(res))
      }
    })
  })
})

// Specified test
describe('Specified test: RangeList', () => {
  test('print expected results：', () => {
    const rl = new RangeList()
    rl.add([1, 5])
    rl.add([10, 20])
    rl.add([20, 20])
    rl.add([20, 21])
    rl.add([2, 4])
    rl.add([3, 8])
    rl.remove([10, 10])
    rl.remove([10, 11])
    rl.remove([15, 17])
    rl.remove([3, 19])
    // rl.add([40, 50])
    // rl.remove([15, 38])
    assert.strictEqual(rl.print(), '[1, 3) [19, 21)')
  })
})
