import styles from "./AuthUi.module.scss";

const AuthUiTitle = ({ children }) => {
  return <div className={styles.AuthUiTitle}>{children}</div>;
};

export default AuthUiTitle;
