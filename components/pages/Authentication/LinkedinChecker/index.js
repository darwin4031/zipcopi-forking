import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect } from "react";
import styles from "./index.module.scss";

function Progress() {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const get_token = async (code, state) => {
      const redirectUri = window.location.href.split("?")[0];
      let role;
      if (pathname === "/authentication/linkedin-signin") {
        role = undefined;
      } else if (pathname === "/authentication/linkedin-register-client") {
        role = "client";
      } else {
        role = "writer";
      }

      try {
        const res = await axios.post("/auth/callback-linkedin", {
          code: code,
          state: state,
          redirect_uri: redirectUri,
          role,
        });
        localStorage.setItem("token", JSON.stringify(res.data));
        const resProfile = await axios.get("/auth/profile/");
        setAuth(resProfile.data);
        router.push("/dashboard");
      } catch (e) {
        router.push("/dashboard/signin");
        // TODO: Please use snack to catch exception here
      }
    };

    if (window !== undefined) {
      const { code, state } = queryString.parse(window.location.search);
      if (code === undefined && state === undefined) {
        router.push("/dashboard/signin");
      } else {
        get_token(code, state);
      }
    }
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <CircularProgress />
        <span>Checking Authentication</span>
      </div>
    </div>
  );
}

export default Progress;
