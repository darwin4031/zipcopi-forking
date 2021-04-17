import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~context/auth";

const useCheckProfile = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/auth/profile/");
        const data = res.data;
        setAuth(data);
      } catch (e) {
        localStorage.removeItem("token");
        console.error(e);
      }
      setLoading(false);
    };

    if (auth === undefined && isBrowser && localStorage.getItem("token")) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return { isLoading };
};

export default useCheckProfile;
