import React from "react";
import styles from "./LocalEditButton.module.scss";
import Button, { ButtonIcon } from "~components/Button/Button";
import IconEditVariant from "~components/svg/icon-edit-variant.svg";

const LocalEditButton = ({ onClick }) => {
  return (
    <Button className={styles.editBtn} type="fab" onClick={onClick}>
      <ButtonIcon className={styles.editBtnIcon} svg={IconEditVariant} />
    </Button>
  );
};

export default LocalEditButton;
