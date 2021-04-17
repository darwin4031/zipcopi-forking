import clsx from "clsx";
import { Children, cloneElement } from "react";
import IllustrationDotsPattern from "~components/svg/illustration-dots-pattern.svg";
import styles from "./AuthUi.module.scss";
import AuthUiForm from "./AuthUiForm";
import AuthUiHeaderIllustration from "./AuthUiHeaderIllustration";
import AuthUiOptions from "./AuthUiOptions";
import AuthUiTitle from "./AuthUiTitle";

const AuthUi = ({ children }) => {
  const titleToRender = Children.map(children, (child) =>
    child.type === AuthUiTitle ? child : null
  );

  const headerIlustrationRender = Children.map(children, (child) => {
    if (child.type === AuthUiHeaderIllustration) {
      const subchildren = child.props.children;

      return cloneElement(child, {
        children: Children.map(subchildren, (subchild) =>
          cloneElement(subchild, {
            className: clsx(styles.AuthUiIllustration, child.props.className),
          })
        ),
      });
    } else {
      return null;
    }
  });

  const formToRender = Children.map(children, (child) =>
    child.type === AuthUiForm ? child : null
  );

  const optionsToRender = Children.map(children, (child) =>
    child.type === AuthUiOptions ? child : null
  );

  const bodyRender = Children.map(children, (child) => (child.type === "div" ? child : null));

  return (
    <div className={styles.AuthUi}>
      <IllustrationDotsPattern className={styles.AuthUiPattern} />
      <div className="container">
        <div className={styles.AuthUiWrapper}>
          <div className={styles.AuthUiBox}>
            <div className={styles.AuthUiHeader}>
              {titleToRender}
              {headerIlustrationRender}
            </div>

            {formToRender}
            {bodyRender}
          </div>

          {optionsToRender}
        </div>
      </div>
    </div>
  );
};

export default AuthUi;
