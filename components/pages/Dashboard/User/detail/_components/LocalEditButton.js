import Button, { ButtonIcon } from "~components/elements/Button";
import IconEditVariant from "~components/svg/icon-edit-variant.svg";
import styles from "./LocalEditButton.module.scss";

const LocalEditButton = ({ onClick }) => {
  return (
    <Button className={styles.editBtn} type="fab" onClick={onClick}>
      <ButtonIcon className={styles.editBtnIcon} svg={IconEditVariant} />
    </Button>
  );
};

export default LocalEditButton;
