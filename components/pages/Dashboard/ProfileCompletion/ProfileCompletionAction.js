import Button from "~components/elements/Button";
import React from "react";
import styles from "./ProfileCompletionAction.module.scss";

const ProfileCompletionAction = ({
  onContinue,
  onCompleteLater,
  withCompleteLater = true,
  isLoading,
}) => {
  return (
    <div className={styles.action}>
      <div>
        <Button
          className={styles.actionContinue}
          label="Continue"
          variant="primary"
          onClick={onContinue}
          isLoading={isLoading}
        />
      </div>

      {withCompleteLater ? (
        <div>
          <Button
            className={styles.actionLater}
            label="Complete later"
            onClick={onCompleteLater}
            disabled={isLoading}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileCompletionAction;
