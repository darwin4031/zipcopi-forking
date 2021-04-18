import { useContext } from "react";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDetails from "../_components/JobDetails";
import JobFiles from "../_components/JobFiles";
import styles from "../place_order/index.module.scss";
import Payment from "./_components/Payment";

const JobPendingPayment = ({ data }) => {
  const {
    id,
    type_display: { name: typeName },
    subject_display: { name: subjectName },
    brief,
    files,
  } = data;
  const { auth } = useContext(AuthContext);

  return auth.role === "client" ? (
    <Payment data={data} />
  ) : (
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
        <div className={jobDetailStyles.status}>Waiting for client payment</div>
        <JobDetails job={data} />
      </div>
    </JobDetailContainer>
  );
};

export default JobPendingPayment;
