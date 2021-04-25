import React, { useContext } from "react";
import LinkedButton from "~components/elements/LinkedButton";
import IllustrationNoJob from "~components/svg/illustration-no-job.svg";
import { AuthContext } from "~context/auth";
import styles from "./EmptyJobClient.module.scss";

const EmptyJob = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <IllustrationNoJob />
        </div>
        <h3 className={styles.title}>Create your first order</h3>
        <div className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </div>
        <div className={styles.action}>
          <div>
            <LinkedButton
              href="/dashboard/jobs/create"
              label="Place your first order"
              variant="primary"
            />
          </div>
          <div>
            <LinkedButton href="/" label="Writing the perfect brief" variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyJob;
