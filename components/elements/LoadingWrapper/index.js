import clsx from "clsx";
import styles from "./index.module.scss";
import WholeLoading from "../WholeLoading";

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
