import clsx from "clsx";
import After from "~components/svg/profile-completion-after.svg";
import Before from "~components/svg/profile-completion-before.svg";
import Center from "~components/svg/profile-completion-center.svg";
import End from "~components/svg/profile-completion-end.svg";
import Start from "~components/svg/profile-completion-start.svg";
import styles from "./ProfileCompletionStepperItem.module.scss";

const ProfileCompletionStepperItem = ({
  isCompleted,
  isActive,
  isFirstItem,
  isLastItem,
  children,
}) => {
  return (
    <div
      className={clsx(styles.item, isActive && styles.isActive, isCompleted && styles.isCompleted)}
    >
      {isFirstItem ? (
        <Start className={clsx(styles.itemSvg, styles.itemBefore)} />
      ) : (
        <Before className={clsx(styles.itemSvg, styles.itemBefore)} />
      )}

      <Center className={clsx(styles.itemSvg, styles.itemCenter)} />
      <h6 className={styles.itemTitle}>{children}</h6>

      {isLastItem ? (
        <End className={clsx(styles.itemSvg, styles.itemAfter)} />
      ) : (
        <After className={clsx(styles.itemSvg, styles.itemAfter)} />
      )}
    </div>
  );
};

export default ProfileCompletionStepperItem;
