import styles from "./JobDescription.module.scss";
import JobFiles from "./JobFiles";

const JobDescription = ({ data }) => {
  const {
    id,
    type_display: { name: typeName },
    subject_display: { name: subjectName },
    brief,
    files,
  } = data;
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{`#${id} ${typeName}`}</h4>
      <h6 className={styles.subTitle}>{subjectName}</h6>
      <div className={styles.brief}>{brief}</div>
      <JobFiles files={files} />
    </div>
  );
};

export default JobDescription;
