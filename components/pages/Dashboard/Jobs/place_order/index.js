import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles
  from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDescription from "../_components/JobDescription";
import JobDetails from "../_components/JobDetails";

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
  const { id } = data;
  const { auth } = useContext(AuthContext);
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        <JobDescription data={data} />
      </div>
      <div className={jobDetailStyles.sidebar}>
        {auth?.role === "writer" ? (
          <JobWriterButton id={id} />
        ) : (
          <div className={jobDetailStyles.status}>Waiting for the writer</div>
        )}
        <JobDetails job={data} />
      </div>
    </JobDetailContainer>
  );
};

export default JobPlaceOrder;
