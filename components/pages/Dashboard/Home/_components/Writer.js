import { useContext } from "react";
import useSWR from "swr";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import { AuthContext } from "~context/auth";
import { fetcher, maybe } from "~utils/index";
import EmptyJobWriter from "./EmptyJobWriter";
import WriterHomePage from "./WriterHomePage";

const Writer = () => {
  const { auth } = useContext(AuthContext);
  const { data } = useSWR(`/writers/${auth?.id}/jobs/`, fetcher);
  const jobs = maybe(() => data.results, []);
  if (!data) {
    return <LoadingWrapper />;
  }
  if (jobs.length === 0) {
    return <EmptyJobWriter />;
  }
  return <WriterHomePage />;
};

export default Writer;
