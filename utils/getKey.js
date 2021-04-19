const getKey = (value, arr) => {
  const keys = Object.keys(arr).filter((currKey) => arr[currKey] == value);
  return keys.length ? keys[0] : null;
};

export default getKey;
