import axios from "axios";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles
  from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobAmendHistories from "../_components/JobAmendHistories";
import JobDetails from "../_components/JobDetails";
import JobWriterWorkHistories from "../_components/JobWriterWorkHistories";
import WriterWork from "../_components/WriterWork";
import styles from "./index.module.scss";

const JobAmend = ({ amend, jobId }) => {
  const { id, text_to_change, created_at } = amend;
  const [loading, setLoading] = useState(false);

  const onAccept = async () => {
    setLoading(true);
    try {
      await axios.patch(`/jobs/${jobId}/amend/${id}/`);
      await mutate(`/jobs/${jobId}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className={styles.amendContainer}>
      <h5 className={styles.amendTitle}>New Amend</h5>
      <div className={styles.amendBody}>
        <span className={styles.amendText}>{text_to_change}</span>
        <span className={styles.amendDate}>{dayjs(created_at + "z").fromNow()}</span>
      </div>
      <Button
        className={jobDetailStyles.sidebarBtn}
        label="Accept"
        variant="primary"
        isLoading={loading}
        onClick={onAccept}
      />
    </div>
  );
};

const JobRevising = ({ data }) => {
  const { auth } = useContext(AuthContext);
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        <WriterWork data={data.latest_work} />
        <JobWriterWorkHistories jobId={data.id} />
      </div>
      <div className={jobDetailStyles.sidebar}>
        {auth?.role === "client" ? (
          <div className={jobDetailStyles.status}>Being Revised</div>
        ) : (
          <JobAmend amend={data.active_amend} jobId={data.id} />
        )}
        <JobDetails job={data} withBrief />
        <JobAmendHistories jobId={data.id} />
      </div>
    </JobDetailContainer>
  );
};

export default JobRevising;
