import React, { useContext } from "react";
import IllustrationNoJob from "~components/svg/illustration-no-job.svg";
import { AuthContext } from "~context/auth";
import LinkedButton from "../LinkedButton";
import styles from "./index.module.scss";

const EmptyJob = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className={styles.empty}>
      <div>
        <div className={styles.emptyIcon}>
          <IllustrationNoJob />
        </div>
        <div className={styles.emptyText}>You don't have any ongoing work yet</div>
        <div className={styles.emptyAction}>
          {auth.role === "client" ? (
            <LinkedButton href="/jobs/create" label="Create new job" variant="primary" />
          ) : (
            <LinkedButton href="/jobs/feeds" label="Search a job" variant="primary" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyJob;
