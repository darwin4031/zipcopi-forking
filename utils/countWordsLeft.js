/**
 * Counting the remaining allowed string
 * @param {String} str the input string
 * @param {Number} limit the length of allowed words
 */
const countWordsLeft = (str, limit) => limit - str.split(/\s+\b/).length;

export default countWordsLeft;
