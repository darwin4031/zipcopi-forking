import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import RatingPopup from "./RatingPopup";
import styles from "../../root.module.scss";

const WriterGiveRating = ({ jobId }) => {
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
      <div className={styles.sidebarInfoSubtitle}>Your Feedback to Client</div>
      <div className={styles.sidebarActions}>
        <Button
          className={styles.sidebarBtn}
          label="Rate Client"
          variant="primary"
          onClick={() => setOpen(true)}
        />
      </div>

      <RatingPopup
        rateFor="Client"
        onCancel={() => setOpen(false)}
        onSubmit={onSubmit}
        isOpen={isOpen}
      />
    </>
  );
};

export default WriterGiveRating;
