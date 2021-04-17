import styles from "./AuthUi.module.scss";

const AuthUiForm = ({ onSubmit, children }) => {
  return (
    <form className={styles.AuthUiForm} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default AuthUiForm;
