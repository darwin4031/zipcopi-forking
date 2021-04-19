import dayjs from "dayjs";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import IconCalendar from "~components/svg/icon-calendar.svg";
import IconWordCount from "~components/svg/icon-word-count.svg";
import styles from "./JobDetails.module.scss";
import JobFiles from "./JobFiles";

const JobBrief = ({ job }) => {
  const {
    brief,
    files,
    subject_display: { name: subjectName },
  } = job;
  return (
    <>
      <div className={jobDetailStyles.sidebarDivider} />
      <div className={jobDetailStyles.sidebarBrief}>
        <h6 className={styles.subject}>{subjectName}</h6>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: brief }} />
      </div>
      <JobFiles files={files} />
    </>
  );
};

const JobDetails = ({ job, withBrief }) => {
  const { deadline_date, deadline, word_count, company, company_url } = job;
  return (
    <>
      <div className={jobDetailStyles.sidebarDivider} />
      <div>
        <h4 className={jobDetailStyles.sidebarInfoTitle}>Job Details</h4>
        <div className={jobDetailStyles.sidebarFlex}>
          <div>
            <div className={jobDetailStyles.sidebarLabel}>Deadline</div>
            <div className={jobDetailStyles.sidebarValue}>
              <div className={jobDetailStyles.sidebarValueIcon}>
                <IconCalendar />
              </div>
              <div>
                {deadline_date
                  ? dayjs(deadline_date + "Z").format("DD/MM/YYYY")
                  : `${deadline} days`}
              </div>
            </div>
          </div>
          <div>
            <div className={jobDetailStyles.sidebarLabel}>Wordcount</div>
            <div className={jobDetailStyles.sidebarValue}>
              <div className={jobDetailStyles.sidebarValueIcon}>
                <IconWordCount />
              </div>
              <div>{word_count}</div>
            </div>
          </div>
        </div>
      </div>
      {withBrief && <JobBrief job={job} />}
      <div className={jobDetailStyles.sidebarClient}>
        <h6 className={jobDetailStyles.sidebarClientTitle}>Client</h6>
        <div className={jobDetailStyles.sidebarClientName}>{company}</div>
        <a href={company_url} target="_blank" className={jobDetailStyles.sidebarClientWeb}>
          {company_url}
        </a>
      </div>
    </>
  );
};

export default JobDetails;
