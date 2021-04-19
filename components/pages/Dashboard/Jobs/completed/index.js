import { useContext } from "react";
import { AuthContext } from "~context/auth";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import JobDetails from "../_components/JobDetails";
import JobWriterWorkHistories from "../_components/JobWriterWorkHistories";
import WriterWork from "../_components/WriterWork";
import ClientGiveRating from "./_components/ClientGiveRating";
import WriterGiveRating from "./_components/WriterGiveRating";
import Rating from "./_components/Rating";

const JobCompleted = ({ data }) => {
  const { auth } = useContext(AuthContext);
  const clientFilter = data.job_rates.filter((rate) => rate.user === data.client);
  const writerFilter = data.job_rates.filter((rate) => rate.user === data.writer);

  let rating, giveRating;
  if (auth.role === "client") {
    if (writerFilter.length === 0) {
      giveRating = <ClientGiveRating jobId={data.id} />;
    }
    if (clientFilter.length > 0) {
      rating = <Rating job_rate={clientFilter[0]} />;
    }
  } else {
    if (clientFilter.length === 0) {
      giveRating = <WriterGiveRating jobId={data.id} />;
    }
    if (writerFilter.length > 0) {
      rating = <Rating job_rate={writerFilter[0]} />;
    }
  }
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        <WriterWork data={data.latest_work} />
        <JobWriterWorkHistories jobId={data.id} />
      </div>
      <div className={jobDetailStyles.sidebar}>
        {giveRating}
        {rating}
        <JobDetails job={data} withBrief />
      </div>
    </JobDetailContainer>
  );
};

export default JobCompleted;
