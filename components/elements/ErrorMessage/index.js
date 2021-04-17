import clsx from "clsx";
import styles from "./index.module.scss";

const ErrorMessage = ({ className, children }) => {
  return <div className={clsx(styles.error, className)}>{children}</div>;
};

export default ErrorMessage;
