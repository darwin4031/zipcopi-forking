import clsx from "clsx";
import { Children, cloneElement, createElement } from "react";
import Button from "~components/elements/Button";
import { LinkedButtonIcon } from "~components/elements/LinkedButton";
import styles from "./AuthUi.module.scss";

const AuthUiOptions = ({ children }) => {
  const childrenRender = Children.map(children, (child) => {
    let childRender = child;

    if (child.type === Button) {
      // //--prod console.log({ sb: child.props.children });
      const subchild = Children.map(child.props.children, (child) => {
        if (child.type === LinkedButtonIcon) {
          return cloneElement(child, {
            className: clsx(child.props.className, styles.AuthUiOptionsIcon),
          });
        } else {
          return child;
        }
      });

      childRender = cloneElement(child, {
        className: clsx(child.props.className, styles.AuthUiAlternate),
        children: subchild,
      });
    }

    return createElement("div", { children: childRender });
  });

  return (
    <div className={styles.AuthUiOptions}>
      <div className={styles.flex}>{childrenRender}</div>
    </div>
  );
};

export default AuthUiOptions;
