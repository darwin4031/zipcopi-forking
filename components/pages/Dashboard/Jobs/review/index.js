import clsx from "clsx";
import { useContext, useState } from "react";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDetails from "../_components/JobDetails";
import Button from "~components/elements/Button";
import styles from "./index.module.scss";

const JobButton = ({ data }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        className={styles.sidebarBtn}
        label="Approve Order"
        variant="primary"
        isLoading={loading}
        // onClick={onApprove}
      />
      <Button
        className={styles.sidebarBtn}
        label="Request Amends"
        variant="secondary"
        isLoading={loading}
        // onClick={onRequestAmend}
      />
      <Button
        className={clsx(styles.sidebarBtn, styles.sidebarBtnReport)}
        label="Report Job"
        isLoading={loading}
      />
    </>
  );
};

const JobReview = ({ data }) => {
  const { auth } = useContext(AuthContext);
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>{/*<JobDescription data={data} />*/}</div>
      <div className={jobDetailStyles.sidebar}>
        {auth.role === "client" ? (
          <JobButton data={data} />
        ) : (
          <div className={jobDetailStyles.status}>Being reviewed</div>
        )}
        <JobDetails job={data} withBrief />
      </div>
    </JobDetailContainer>
  );
};

export default JobReview;
