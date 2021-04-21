import { useContext } from "react";
import { AuthContext } from "~context/auth";
import { fetcher, maybe } from "~utils/index";
import EmptyJobClient from "./EmptyJobClient";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import useSWR from "swr";
import ClientHomePage from "./ClientHomePage";

const Client = () => {
  const { auth } = useContext(AuthContext);
  const { data } = useSWR(`/clients/${auth?.id}/jobs/`, fetcher);
  const jobs = maybe(() => data.results, []);
  if (!data) {
    return <LoadingWrapper />;
  }
  if (jobs.length === 0) {
    return <EmptyJobClient />;
  }
  return <ClientHomePage />;
};

export default Client;
