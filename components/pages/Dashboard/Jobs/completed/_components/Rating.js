import { useContext } from "react";
import Button from "~components/elements/Button";
import Stars from "~components/elements/Stars";
import { AuthContext } from "~context/auth";
import styles from "./Rating.module.scss";

const Rating = ({ job_rate }) => {
  const { auth } = useContext(AuthContext);
  const { rate, note } = job_rate;

  return (
    <div>
      <div className={styles.title}>
        {`${auth.role === "client" ? "Writer's" : "Client's"} Feedback to you`}
      </div>
      <div className={styles.stars}>
        <Stars rate={rate} />
      </div>
      <div className={styles.content}>{note}</div>
      <Button className={styles.btn} label="Report Rating" />
    </div>
  );
};

export default Rating;
