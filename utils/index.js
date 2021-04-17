import axios from "axios";

export const fetcher = (url, options = {}) => axios.get(url, options).then((res) => res.data);
export const countWords = (str) => str.split(/\s+\b/).length;
export const countWordsLeft = (str, limit) => limit - str.split(/\s+\b/).length;
export const getUnique = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};
export const setErrors = (setError, errors = {}) => {
  Object.keys(errors).map((key) => {
    setError(key, {
      type: "manual",
      message: errors[key][0],
    });
  });
};
export const maybe = (exp, d) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};
