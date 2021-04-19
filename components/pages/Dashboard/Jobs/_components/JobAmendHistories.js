import dayjs from "dayjs";
import useSWR from "swr";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { fetcher, maybe } from "~utils/index";
import styles from "./JobAmendHistories.module.scss";

const JobAmends = ({ jobId }) => {
  const { data: rawData } = useSWR(`/jobs/${jobId}/amend/`, fetcher);
  const amends = maybe(() => rawData.results, []);

  if (!rawData) return null;
  return amends.length > 0 ? (
    <>
      <div className={jobDetailStyles.sidebarDivider} />
      <div className={styles.container}>
        <h4 className={styles.title}>Past Amends</h4>
        <div className={styles.wrapper}>
          {amends.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.text}>{item.text_to_change}</div>
              <div className={styles.date}>{dayjs(item.created_at + "z").fromNow()}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : null;
};

export default JobAmends;
