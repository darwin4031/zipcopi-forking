import { useContext } from "react";
import useSWR from "swr";
import EmptyJob from "~components/elements/EmptyJob";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import { AuthContext } from "~context/auth";
import { fetcher, maybe } from "~utils/index";
import JobCard from "../_components/JobCard";
import styles from "./index.module.scss";
import clsx from "clsx";
const status = {
  client: ["place_order", "place_quote", "review", "revising", "writing", "pending_payment"],
  writer: ["review", "revising", "writing", "pending_payment"],
};

const Base = ({ data = [], withPadding }) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.wrapper, withPadding && styles.withPadding)}>
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

const JobInProgress = ({ withPadding }) => {
  const { auth } = useContext(AuthContext);
  const role = auth.role;
  const userId = auth.id;
  const { data: rawData } = useSWR(
    [`/${role}s/${userId}/jobs/`, status[role].join(", ")],
    (url, status) => fetcher(url, { params: { status__in: status } })
  );
  const data = maybe(() => rawData.results, []);
  if (!rawData) return <LoadingWrapper />;
  return <Base data={data} withPadding={withPadding} />;
};

export default JobInProgress;
