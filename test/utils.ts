
// getRandomInt
const MAX = 9007199254740992
const MIN = 0 - MAX
export function getRandomInteger (min: number = MIN, max: number = MAX) {
  return Math.round(Math.random() * (max - min)) + min
}
// getRandomNumberRange
export function randomRange (length, left, right) {
  const min = getRandomInteger(left, right)
  while (min + length <= right) {
    break
  }
  return [min, min + length]
}
