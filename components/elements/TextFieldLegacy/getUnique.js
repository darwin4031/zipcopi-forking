/**
 * To get unique string, you can use it for ID or whatever
 */
const getUnique = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};

export default getUnique;
