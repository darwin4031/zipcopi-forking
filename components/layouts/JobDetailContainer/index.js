import styles from "./JobDetailContainer.module.scss";

const JobDetailContainer = ({ children }) => (
  <div className={styles.root}>
    <div className={styles.box}>
      <div className={styles.flex}>{children}</div>
    </div>
  </div>
);

export default JobDetailContainer;
