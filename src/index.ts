import { NumberArray } from './types'
import { binarySearch } from './utils'

// check params of `add` add `remove`
function checkParams (range: NumberArray): void {
  const [min, max, ...other] = range
  if(~~min !== min || ~~max !== max || other.length > 0) {
    throw new Error(`The params of 'add' add 'remove' must be an array of two integers, but got: [${range}]`)
  }
  if(min > max) {
    throw new Error(`The left value of the range must be less than the right value, but got: [${range}]`)
  }
}

class RangeList {

  private stack: NumberArray[] = [] // record range node

  // find index of range by binarySearch
  private findIndexOfRange (numberNodes: NumberArray, range: NumberArray): NumberArray {
    const [min, max] = range
    const maxIndex = binarySearch(numberNodes, max)
    const minIndex = (min === max || maxIndex === -1)
      ? maxIndex
      : binarySearch(numberNodes.slice(0, maxIndex + 1), min)
    return [minIndex, maxIndex]
  }

  // All number boundaries
  get numberNodes () {
    return this.stack.reduce((cur, item) => [...cur, ...item], [])
  }
  
  getStackFromNumberNodes (nodes: NumberArray): NumberArray[] {
    return Array.from({ length: nodes.length / 2 }, (_, i) => [nodes[i * 2], nodes[i * 2 + 1]])
  }

  /**
   * Adds a range to the list * 
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add (range: NumberArray) {
    checkParams(range)
    const [min, max] = range
    if (min === max) return // not add any range
    // if integers is empty, add range directly
    if (this.stack.length === 0) {
      this.stack = [ range ]
      return
    }
    
    const numberNodes = this.numberNodes

    const [minIndex, maxIndex] = this.findIndexOfRange(numberNodes, [min, max])
    const minOutOfRange = minIndex % 2 !== 0 // min not in the existing interval
    const maxOutOfRange = maxIndex % 2 !== 0 // max not in the existing interval

    let leftNumberNodes // The number nodes on the left when it has been added
    let rightNumberNodes // The number nodes on the left when it has been added
    if (minOutOfRange) { // Odd number
      if (minIndex >= 0 && numberNodes[minIndex] === min) {
        leftNumberNodes = numberNodes.slice(0, minIndex)
      } else {
        leftNumberNodes = numberNodes.slice(0, minIndex + 1).concat([min])
      }
    } else {
      leftNumberNodes = numberNodes.slice(0, minIndex + 1)
    }
    if (maxOutOfRange) { // Odd number
      if(maxIndex === numberNodes.length - 1) {
        rightNumberNodes = [max]
      } else {
        rightNumberNodes = [max].concat(numberNodes.slice(maxIndex - (numberNodes.length - 1)))
      }
    } else {
      rightNumberNodes = numberNodes.slice(maxIndex - (numberNodes.length - 1))
    }
    const newNumberNodes = leftNumberNodes.concat(rightNumberNodes)
    this.stack = this.getStackFromNumberNodes(newNumberNodes)
    // console.log('numberNodes =>', numberNodes,
    //   'range =>', range,
    //   'leftNumberNodes => ', leftNumberNodes,
    //   'rightNumberNodes => ', rightNumberNodes,
    //   // 'length => ', length,
    //   'this.stack => ', this.stack,
    //   'minIndex =>', minIndex, 'maxIndex =>', maxIndex)
  }
  

  /**
   * Removes a range from the list * 
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove (range: NumberArray) {
    checkParams(range)
    const [min, max] = range
    if (min === max) return // not remove any range
    // if stack is empty, not modify
    if (this.stack.length === 0) {
      return
    }
    const numberNodes = this.numberNodes

    const [minIndex, maxIndex] = this.findIndexOfRange(numberNodes, [min, max])
    const minOutOfRange = minIndex % 2 !== 0 // min not in the existing interval
    const maxOutOfRange = maxIndex % 2 !== 0 // max not in the existing interval

    let leftNumberNodes // The number nodes on the left when it has been removed
    let rightNumberNodes // The number nodes on the left when it has been removed

    if (minOutOfRange) { // Odd number
      leftNumberNodes = numberNodes.slice(0, minIndex + 1)
    } else {
      if (numberNodes[minIndex] === min) {
        leftNumberNodes = numberNodes.slice(0, minIndex)
      } else {
        leftNumberNodes = numberNodes.slice(0, minIndex + 1).concat([min])
      }
    }
    if (maxOutOfRange) { // Odd number
      rightNumberNodes = maxIndex === numberNodes.length - 1
        ? []
        : numberNodes.slice(maxIndex - (numberNodes.length - 1))
    } else {
      rightNumberNodes = [max].concat(
        numberNodes.slice(maxIndex - (numberNodes.length - 1))
      )
    }
    const newNumberNodes = leftNumberNodes.concat(rightNumberNodes)
    this.stack = this.getStackFromNumberNodes(newNumberNodes)
    // console.log('numberNodes =>', numberNodes,
    //   'range =>', range,
    //   'leftNumberNodes => ', leftNumberNodes,
    //   'rightNumberNodes => ', rightNumberNodes,
    //   // 'length => ', length,
    //   'this.stack => ', this.stack,
    //   'minIndex =>', minIndex, 'maxIndex =>', maxIndex)
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print () {
    return this.stack.map(item => `[${item.join(', ')})`).join(' ')
  }
}

export default RangeList
