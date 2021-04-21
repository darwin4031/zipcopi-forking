import { useContext } from "react";
import { AuthContext } from "~context/auth";
import Client from "./_components/Client";
import Writer from "./_components/Writer";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return auth?.role === "client" ? <Client /> : <Writer />;
};

export default Home;
