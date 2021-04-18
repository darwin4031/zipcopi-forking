import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDetails from "../_components/JobDetails";
import JobFiles from "../_components/JobFiles";
import styles from "./index.module.scss";

const JobWriterButton = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onAccept = async () => {
    setLoading(true);
    try {
      await axios.post(`/jobs/${id}/accept_job/`);
      await mutate(`/jobs/${id}`);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <div>
      <Button
        className={jobDetailStyles.sidebarBtn}
        label="Accept"
        variant="primary"
        isLoading={loading}
        onClick={onAccept}
      />
      <Button
        className={jobDetailStyles.sidebarBtn}
        label="Reject"
        variant="secondary"
        isLoading={loading}
        onClick={() => router.push("/dashboard/jobs/feeds")}
      />
      <Button
        className={clsx(jobDetailStyles.sidebarBtn, jobDetailStyles.sidebarBtnReport)}
        isLoading={loading}
        label="Report Job"
      />
    </div>
  );
};

const JobPlaceOrder = ({ data }) => {
  const {
    id,
    type_display: { name: typeName },
    subject_display: { name: subjectName },
    brief,
    files,
  } = data;
  const { auth } = useContext(AuthContext);
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        <div className={styles.container}>
          <h4 className={styles.title}>{`#${id} ${typeName}`}</h4>
          <h6 className={styles.subTitle}>{subjectName}</h6>
          <div className={styles.brief}>{brief}</div>
          <JobFiles files={files} />
        </div>
      </div>
      <div className={jobDetailStyles.sidebar}>
        {auth.role === "writer" ? (
          <JobWriterButton id={id} />
        ) : (
          <div className={jobDetailStyles.status}>Waiting for the writter</div>
        )}
        <JobDetails job={data} />
      </div>
    </JobDetailContainer>
  );
};

export default JobPlaceOrder;
