import styles from "./ProfileCompletionHeader.module.scss";

const ProfileCompletionHeader = () => {
  return (
    <div className={styles.header}>
      <h3 className={styles.headerTitle}>Before you start</h3>
      <h6 className={styles.headerSubtitle}>Please complete profile</h6>
    </div>
  );
};

export default ProfileCompletionHeader;
