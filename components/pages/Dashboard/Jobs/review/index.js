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
import JobDescription from "../_components/JobDescription";

const JobReview = ({ data }) => {
  const { id } = data;
  const { auth } = useContext(AuthContext);
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>{/*<JobDescription data={data} />*/}</div>
      <div className={jobDetailStyles.sidebar}>
        {auth.role === "client" ? (
          <div />
        ) : (
          <div className={jobDetailStyles.status}>Being reviewed</div>
        )}
        <JobDetails job={data} withBrief />
      </div>
    </JobDetailContainer>
  );
};

export default JobReview;
