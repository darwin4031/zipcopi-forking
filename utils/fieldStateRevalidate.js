/**
 * Perform re-validation for a fieldState
 * @param {Object} fieldState state object to re-validate
 * @param {Function} validateField function use for a validation
 *
 * @param {Object} options optional options
 * @param {String[]} options.includeKey only perform validation on this key
 *
 * @returns {{ newErrorState: Object, isError: Boolean }}
 */
const fieldStateRevalidate = (fieldState, validateField, options = {}) => {
  // Re-validate everything before continue
  let newErr = {};

  if (options.includeKey && options.includeKey.length > 0) {
    options.includeKey.forEach((key, i) => {
      newErr[key] = validateField(key, fieldState[key]);
    });
  } else {
    Object.keys(fieldState).forEach(
      (key, i) => (newErr[key] = validateField(key, fieldState[key])),
    );
  }

  const isError = Object.keys(newErr).filter((key) => newErr[key]).length > 0;

  return { newErrorState: newErr, isError };
};

export default fieldStateRevalidate;
