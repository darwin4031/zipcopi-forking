import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Button from "~components/elements/Button";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import { AuthContext } from "~context/auth";
import JobDescription from "../_components/JobDescription";
import JobDetails from "../_components/JobDetails";
import JobForm from "./_components/JobForm";
import JobWithdraw from "./_components/JobWithdraw";

const JobWriting = ({ data }) => {
  const router = useRouter();
  const [loadingMessage, setLoadingMessage] = useState(false);
  const { auth } = useContext(AuthContext);
  const isWriter = auth.role === "writer";

  const onChat = async () => {
    setLoadingMessage(true);
    try {
      const res = await axios.post("/rooms/", {
        name: "",
        type: "PE",
        target_id: data.client,
      });
      router.push(`/dashboard/messages?id=${res.data.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        {isWriter ? <JobForm data={data} /> : <JobDescription data={data} />}
      </div>
      <div className={jobDetailStyles.sidebar}>
        {isWriter && (
          <Button
            className={jobDetailStyles.sidebarBtn}
            label="Messages"
            variant="primary"
            onClick={onChat}
            isLoading={loadingMessage}
          />
        )}
        {isWriter ? <div /> : <div className={jobDetailStyles.status}>Being worked on</div>}
        <JobDetails job={data} withBrief={isWriter} />
        {isWriter && <JobWithdraw data={data} />}
      </div>
    </JobDetailContainer>
  );
};

export default JobWriting;
