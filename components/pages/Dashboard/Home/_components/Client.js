import { useContext } from "react";
import useSWR from "swr";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import { AuthContext } from "~context/auth";
import { fetcher, maybe } from "~utils/index";
import ClientHomePage from "./ClientHomePage";
import EmptyJobClient from "./EmptyJobClient";

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
