import clsx from "clsx";
import styles from "./SignupRoleSelection.module.scss";

const SignupRoleSelection = ({ activeRole, setRole }) => {
  return (
    <div className={styles.wrapper}>
      <div>I'm a </div>
      <div className={styles.list}>
        {["client", "writer"].map((role, i) => (
          <button
            key={i}
            className={clsx(styles.item, activeRole === role && styles.isActive)}
            onClick={() => setRole(role)}
            type="button"
          >
            {role.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignupRoleSelection;
