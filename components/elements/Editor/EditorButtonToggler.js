import clsx from "clsx";
import React from "react";
import { useSlate } from "slate-react";
import Button, { ButtonIcon } from "~components/elements/Button";
import styles from "./EditorButtonToggler.module.scss";

const EditorButtonToggler = ({ iconSvg, format, onMouseDown, checkActive }) => {
  const editor = useSlate();

  return (
    <Button
      className={clsx(styles.button, checkActive(editor, format) && styles.isActive)}
      type="fab"
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
    >
      <ButtonIcon className={styles.buttonIcon} svg={iconSvg} />
    </Button>
  );
};

export default EditorButtonToggler;
