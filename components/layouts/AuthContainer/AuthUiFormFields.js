import clsx from "clsx";
import { Children, cloneElement, createElement } from "react";
import Button from "~components/elements/Button";
import TextField from "~components/elements/TextField";
import styles from "./AuthUi.module.scss";

const AuthUiFormFields = ({ children }) => {
  const textFieldToRender = Children.map(children, (child) => {
    if (child.type === TextField) {
      return cloneElement(child, {
        className: clsx(child.props.className, styles.field),
      });
    } else if (child.type === Button) {
      return createElement("div", {
        className: styles.submitWrapper,
        children: cloneElement(child, {
          className: clsx(child.props.className, styles.submit),
          variant: "primary",
        }),
      });
    } else {
      return child;
    }
  });

  return <div className={styles.AuthUiFormFields}>{textFieldToRender}</div>;
};

export default AuthUiFormFields;
