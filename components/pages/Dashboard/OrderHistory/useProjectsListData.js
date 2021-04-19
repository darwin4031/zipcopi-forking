import { AuthContext } from "~context/auth";

// Types definitions
import axios from "axios";
import { useContext, useEffect, useState } from "react";

/**
 * @typedef {Object} Type_useProjectsListData
 * @property {Array<API_Project>} data
 * @property {(data: Array) => void} setData
 * @property {Boolean} isLoading whether it's still fetching or not
 * @property {Function} fetchProjectListData perform the fetch action manually
 */

/**
 * Get Project List
 * @returns {Type_useProjectsListData}
 */
function useProjectsListData() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  function fetchProjectListData() {
    const url = auth.role === "client" ? `/clients/${auth.id}/jobs/` : `/writers/${auth.id}/jobs/`;

    if (!isLoading) {
      setLoading(true);
    }

    axios
      .get(url)
      .then((res) => {
        /**
         * for `client` its returns array of projects
         * for `writer` its returns pagination array of projects
         * why is it differet? Idk, but the API says so :)
         */
        let data = Array.isArray(res.data) ? res.data : res.data.results;

        // data = data.map((item, i) => {
        //   const type =
        //     types.filter((type) => type.id === item.type)?.[0] ?? item.type;
        //   return { ...item, type };
        // });

        //--prod console.log("useMyProjectsData", { data });
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error({ err });
        if (err?.response?.status === 404) {
          setData([]);
          setLoading(false);
        } else {
          console.error("useMyProjectsData", { err });
        }
      });
  }

  useEffect(() => {
    if (isLoading) {
      fetchProjectListData();
    }
  }, []);

  return { data, setData, isLoading, fetchProjectListData };
}

export default useProjectsListData;
