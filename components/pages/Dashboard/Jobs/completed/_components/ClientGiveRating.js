import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import RatingPopup from "./RatingPopup";
import styles from "../../root.module.scss";

const ClientGiveRating = ({ jobId }) => {
  const [isOpen, setOpen] = useState(false);

  const onSubmit = async ({ rate, note }) => {
    try {
      await axios.post(`/jobs/${jobId}/rate/`, { rate, note });
      await mutate(`/jobs/${jobId}`);
    } catch (e) {
      console.error("onSubmit - ClientGiveRating", { e });
    }
  };

  return (
    <>
      <div className={styles.sidebarInfoSubtitle}>Your Feedback to Writer</div>
      <div className={styles.sidebarActions}>
        <Button
          className={styles.sidebarBtn}
          label="Rate Writer"
          variant="primary"
          onClick={() => setOpen(true)}
        />
      </div>
      <RatingPopup
        rateFor="Writer"
        onCancel={() => setOpen(false)}
        onSubmit={onSubmit}
        isOpen={isOpen}
      />
    </>
  );
};

export default ClientGiveRating;
