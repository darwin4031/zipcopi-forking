import clsx from "clsx";
import { Children, cloneElement } from "react";
import GeneralLink from "~components/elements/GeneralLink";
import styles from "./AuthUi.module.scss";

const AuthUiFormFieldsAlternate = ({ children }) => {
  const childrenRender = Children.map(children, (child) => {
    if (child.type === GeneralLink) {
      return cloneElement(child, {
        className: clsx(child.props.className, styles.link),
      });
    } else {
      return child;
    }
  });

  return <div className={styles.AuthUiFieldsAlternate}>{childrenRender}</div>;
};

export default AuthUiFormFieldsAlternate;
