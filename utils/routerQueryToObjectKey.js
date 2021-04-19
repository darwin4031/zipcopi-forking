/**
 * Convert URL Query parameters array / string into an Object with true or
 * false value
 *
 * @example
 * // url = /home?filter=today&filter=yesterday
 * const query = useRouter().query.filter;
 * const object = routerQueryToObjectKeys(query);
 * //--prod console.log(object); // { today: true, yesterday: true }
 *
 * @param {Array | String} query NextJs query parameter
 */
const routerQueryToObjectKeys = (query) => {
  let result = {};

  if (query) {
    if (Array.isArray(query)) {
      query.map((value) => (result[value] = true));
    } else {
      result[query] = true;
    }
  }

  return result;
};

export default routerQueryToObjectKeys;
