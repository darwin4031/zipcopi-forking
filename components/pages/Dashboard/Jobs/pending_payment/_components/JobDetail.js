import AvatarCard from "~components/elements/AvatarCard";
import styles from "./JobDetail.module.scss";

const JobDetail = ({ data }) => {
  const {
    premium_job,
    brief,
    word_count,
    subject_display: { name: subjectName },
    type_display: { name: typeName },
    writer_display: {
      first_name,
      last_name,
      detail: { avatar },
    },
  } = data;
  return (
    <div className={styles.stepContainer}>
      <p className={styles.label}>Writers</p>
      <div className={styles.writersBlock}>
        <AvatarCard image={avatar ? avatar : "/img/avatar.png"} />
        <div className={styles.writersInfoBlock}>
          <p className={styles.avatarName}>
            {first_name} {last_name}
          </p>
          <p className={styles.copyText}>Website copy</p>
        </div>
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.infoTitleBlock}>
          <p className={styles.subTitle}>{subjectName}</p>
          <p className={styles.subTitle}>{premium_job.toUpperCase()} Package</p>
        </div>
        <p className={styles.infoText}>{brief}</p>
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.detailsItem}>
          <p className={styles.detailsText}>Job type :</p>
          <p className={styles.copyText}>{typeName}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.detailsText}>Word count :</p>
          <p className={styles.copyText}>{word_count}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
