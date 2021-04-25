import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~context/auth";

const AuthChecker = ({ children, isPublic, role }) => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    if (isPublic && auth !== undefined) {
      router.push("/dashboard");
    } else if (!isPublic) {
      if (auth === undefined) {
        router.push("/signin");
      } else if (role !== undefined) {
        if (role === "client" && auth?.role !== "client") {
          router.push("/dashboard");
        } else if (role === "writer" && auth?.role !== "writer") {
          router.push("/dashboard");
        } else {
          setChecking(false);
        }
      } else {
        setChecking(false);
      }
    } else {
      setChecking(false);
    }
  }, []);

  return !checking ? children : null;
};

export default AuthChecker;
