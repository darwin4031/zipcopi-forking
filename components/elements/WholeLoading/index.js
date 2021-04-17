import IconLoading from "~components/svg/icon-loading.svg";
import styles from "./index.module.scss";

const WholeLoading = () => (
  <div className={styles.wholeLoading}>
    <div className={styles.wholeLoading__element}>
      <div className={styles.wholeLoading__rotator}>
        <IconLoading className={styles.wholeLoading__svg} />
      </div>
    </div>
  </div>
);

export default WholeLoading;
