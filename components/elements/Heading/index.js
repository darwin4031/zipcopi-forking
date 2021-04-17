import clsx from "clsx";
import styles from "./index.module.scss";

const H1 = ({ children, ...props }) => {
  return <h1 {...props}>{children}</h1>;
};

const H2 = ({ className, children, ...props }) => {
  return (
    <h2 className={clsx(styles.h2, styles.heading, className)} {...props}>
      {children}
    </h2>
  );
};

const H3 = ({ className, children, ...props }) => {
  return (
    <h3 className={clsx(styles.h3, styles.heading, className)} {...props}>
      {children}
    </h3>
  );
};

const H4 = ({ className, children, ...props }) => {
  return (
    <h4 className={clsx(styles.h4, styles.heading, className)} {...props}>
      {children}
    </h4>
  );
};

const H5 = ({ className, children, ...props }) => {
  return (
    <h5 className={clsx(styles.h5, styles.heading, className)} {...props}>
      {children}
    </h5>
  );
};

const H6 = ({ className, children, ...props }) => {
  return (
    <h6 className={clsx(styles.h6, styles.heading, className)} {...props}>
      {children}
    </h6>
  );
};

export { H1, H2, H3, H4, H5, H6 };
