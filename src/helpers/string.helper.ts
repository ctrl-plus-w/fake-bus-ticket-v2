/**
 * Multiply a character
 * @param {string} char The character to multiply
 * @param {number} amount The number of times to multiply the number
 * @returns A string
 */
export const multChars = (char: string, amount: number): string =>
  new Array(amount).fill(char).join('');

/**
 * Add the needed leading zeros to make the number the right length
 * @param {number} number The number to transform
 * @returns A stringified number
 */
export const formatNumber = (number: number, expectedLength = 2) => {
  const numLength = number.toString().length;

  return numLength < expectedLength
    ? `${multChars('0', expectedLength - numLength)}${number}`
    : `${number}`;
};
