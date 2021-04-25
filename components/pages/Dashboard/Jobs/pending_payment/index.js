import { useContext } from "react";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles
  from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDescription from "../_components/JobDescription";
import JobDetails from "../_components/JobDetails";
import Payment from "./_components/Payment";

const JobPendingPayment = ({ data }) => {
  const { auth } = useContext(AuthContext);

  return auth?.role === "client" ? (
    <Payment data={data} />
  ) : (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        <JobDescription data={data} />
      </div>
      <div className={jobDetailStyles.sidebar}>
        <div className={jobDetailStyles.status}>Waiting for client payment</div>
        <JobDetails job={data} />
      </div>
    </JobDetailContainer>
  );
};

export default JobPendingPayment;
