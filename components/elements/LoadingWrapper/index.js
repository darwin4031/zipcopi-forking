import clsx from "clsx";
import WholeLoading from "../WholeLoading";
import styles from "./index.module.scss";

const LoadingWrapper = ({ usePercentage }) => (
  <div
    className={clsx(styles.loadingWrapper, {
      [styles.isPercentage]: usePercentage,
    })}
  >
    <WholeLoading />
  </div>
);

export default LoadingWrapper;
