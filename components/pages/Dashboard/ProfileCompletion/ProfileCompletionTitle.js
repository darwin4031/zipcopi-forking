import clsx from "clsx";
import styles from "./ProfileCompletionTitle.module.scss";

const ProfileCompletionTitle = ({ children }) => {
  return <div className={clsx(styles.title)}>{children}</div>;
};

export default ProfileCompletionTitle;
