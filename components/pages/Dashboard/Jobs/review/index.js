import { useContext, useState } from "react";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDetails from "../_components/JobDetails";
import Button from "~components/elements/Button";

const JobButton = ({ data }) => {
  return (
    <>
      <Button
        className={projectStyles.sidebarBtn}
        label="Approve Order"
        variant="primary"
        isLoading={isApproveLoading}
        onClick={onApprove}
      />
      <Button
        className={projectStyles.sidebarBtn}
        label="Request Amends"
        variant="secondary"
        onClick={onRequestAmend}
      />
      <Button
        className={mc(projectStyles.sidebarBtn, projectStyles.sidebarBtnReport)}
        label="Report Job"
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
