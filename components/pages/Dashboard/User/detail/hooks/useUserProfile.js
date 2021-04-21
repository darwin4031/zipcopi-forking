import axios from "axios";
import { useEffect, useState } from "react";

/**
 * User Profile
 * @param {Number} userId
 * @param {String} definedRole if you already know the role, insert here,
 * otherwise it will try to fetch to both writer and client endpoint until it
 * get expected data
 */
function useUserProfile(userId, definedRole = null) {
  const [data, setData] = useState();
  const [isFetching, setFetching] = useState(true);

  if (definedRole) {
    if (definedRole === "writer") definedRole = "writers";
    if (definedRole === "client") definedRole = "clients";
  }

  const fetchUserProfile = (role = "writers") => {
    if (!isFetching) setFetching(true);

    //--prod console.log({ a: definedRole || role });
    axios
      .get(`/${definedRole || role}/${userId}`)
      .then((res) => {
        /*
        //--prod console.log({
          res,
          data: {
            ...res.data,
            role: role === "writers" ? "writer" : "client",
          },
        });
        */
        setData({
          ...res.data,
          role: role === "writers" ? "writer" : "client",
        });
        setFetching(false);
      })
      .catch((err) => {
        console.error({ err });
        if (err.response.status === 404 && role === "writers") {
          fetchUserProfile("clients");
        }
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { data, isFetching, fetchData: fetchUserProfile };
}

export default useUserProfile;
