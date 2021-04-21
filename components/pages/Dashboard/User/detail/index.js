import { useContext } from "react";
import { AuthContext } from "~context/auth";

const UserDetail = () => {
  const { auth } = useContext(AuthContext);
  return <div></div>;
};

export default UserDetail;
