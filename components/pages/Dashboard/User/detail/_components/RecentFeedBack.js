import dayjs from "dayjs";
import useSWR from "swr";
import Stars from "~components/elements/Stars";
import { fetcher, maybe } from "~utils/index";
import styles from "./RecentFeedback.module.scss";

const FeedBack = ({ feedback }) => {
  const {
    created_at,
    rate,
    note,
    job: {
      subject: { name: subjectName },
      type: { name: typeName },
      word_count,
    },
  } = feedback;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemTitle}>
        {typeName} ({subjectName}, {word_count} words)
      </div>
      <div className={styles.rateContainer}>
        <div>
          <Stars rate={rate} />
        </div>
        <div className={styles.itemDate}>
          {dayjs(created_at + "Z").format("MMM, DD YYYY HH:mm")}
        </div>
      </div>
      <div className={styles.itemRate}>{note}</div>
    </div>
  );
};

const RecentFeedBack = ({ userId, role }) => {
  const { data: rawData } = useSWR(`/${role}s/${userId}/rates/`, fetcher);
  const data = maybe(() => rawData.results, []);

  return rawData ? (
    <div className={styles.container}>
      <div className={styles.title}>Recent Reviews</div>
      {data.length > 0 ? (
        <div className={styles.wrapper}>
          {data.map((feedback) => (
            <FeedBack key={feedback.id} feedback={feedback} />
          ))}
          {data.map((feedback) => (
            <FeedBack key={feedback.id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <div>No reviews.</div>
      )}
    </div>
  ) : null;
};

export default RecentFeedBack;
