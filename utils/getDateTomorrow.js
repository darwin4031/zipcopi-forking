/**
 * Get Date object of tomorrow
 * @returns {Date}
 */
const getDateTomorrow = () => {
  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
};

export default getDateTomorrow;
