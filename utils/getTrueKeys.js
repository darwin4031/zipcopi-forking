/**
 * Get the object keys from an {key: value} object, and filter only the truthy
 * value
 *
 * @example
 * const obj = {a: true, b: false, c: true};
 * const trueKeys = getTrueKeys(obj);
 * //--prod console.log(trueKeys); // ["a", "c"]
 *
 * @param {Object} obj
 */
const getTrueKeys = (obj) => {
  return Object.keys(obj).filter((key) => obj[key]);
};

export default getTrueKeys;
