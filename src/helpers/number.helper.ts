/**
 * Get all the odds numbers until a value
 * @param {number} maxValue The interval max value
 * @param {boolean} startAtZero Does the numbers should include 0
 * @returns An Array of Numbers
 */
export const getOdds = (maxValue: number, startAtZero = false): number[] => {
  const odds: number[] = [];

  for (let i = startAtZero ? 0 : 2; i <= maxValue; i += 2) {
    odds.push(i);
  }

  return odds;
};

/**
 * Get the closer odd in an array, else increment
 * @param {number[]} odds The array of odds numbers
 * @param {number} number The number which to get the closer odd
 * @param {number} incr The amount to increment if the isn't in the odd array
 * @returns A number
 */
export const getCloserOddOrIncrement = (
  odds: number[],
  number: number,
  incr: number,
) => {
  const isInOddsArray = odds.some((el) => el === number);

  return isInOddsArray ? number : number + incr;
};
