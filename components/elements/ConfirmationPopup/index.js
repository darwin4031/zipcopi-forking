import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import IconWarning from "~components/svg/icon-warning.svg";
import styles from "./index.module.scss";

const ConfirmationPopup = ({
  title,
  content,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  isOpen,
  isSubmitLoading = false,
}) => {
  return (
    <Popup classNameBox={styles.confirmationBox} isOpen={isOpen}>
      <div className={styles.confirmationIcon}>
        <IconWarning />
      </div>
      <h4 className={styles.confirmationTitle}>{title}</h4>
      <div className={styles.confirmationContent} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.confirmationActions}>
        <div>
          <Button
            className={styles.confirmationAction}
            label={cancelText}
            variant="secondary"
            onClick={onCancel}
          />
        </div>
        <div>
          <Button
            className={styles.confirmationAction}
            label={submitText}
            variant="primary"
            onClick={onSubmit}
            isLoading={isSubmitLoading}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmationPopup;
