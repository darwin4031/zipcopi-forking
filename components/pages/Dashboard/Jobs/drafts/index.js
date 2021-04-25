import { useContext } from "react";
import useSWR from "swr";
import EmptyJob from "~components/elements/EmptyJob";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import { AuthContext } from "~context/auth";
import { fetcher, maybe } from "~utils/index";
import JobCard from "../_components/JobCard";
import styles from "./index.module.scss";

const Base = ({ data = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          {data.length === 0 ? (
            <EmptyJob />
          ) : (
            data.map((item) => (
              <div key={item.id}>
                <JobCard data={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const JobDrafts = () => {
  const { auth } = useContext(AuthContext);
  const userId = auth?.id;
  const { data: rawData } = useSWR([`/clients/${userId}/jobs/`, "draft"], (url, status) =>
    fetcher(url, { params: { status__in: status } })
  );
  const data = maybe(() => rawData.results, []);
  if (!rawData) return <LoadingWrapper />;
  return <Base data={data} />;
};

export default JobDrafts;
