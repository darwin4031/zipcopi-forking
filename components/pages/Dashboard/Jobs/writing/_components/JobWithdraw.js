import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useOpen from "~hooks/useOpen";
import Button from "~components/elements/Button";
import ConfirmationPopup from "~components/elements/ConfirmationPopup";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import styles from "./JobWithdraw.module.scss";

const JobWithdraw = ({ data }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useOpen(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`/jobs/${data.id}/withdraw/`);
      router.push("/dashboard/jobs/feeds");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className={jobDetailStyles.sidebarDivider} />
      <Button
        variant="secondary"
        label="Withdraw from job"
        onClick={onOpen}
        className={styles.withDrawButton}
      />
      <ConfirmationPopup
        isOpen={isOpen}
        title="Consequences of withdrawing"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus neque turpis, dapibus "
        cancelText="Cancel"
        submitText="Withdraw"
        onCancel={onClose}
        onSubmit={onSubmit}
        isSubmitLoading={loading}
      />
    </>
  );
};

export default JobWithdraw;
