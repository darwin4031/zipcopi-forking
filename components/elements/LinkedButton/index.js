import clsx from "clsx";
import Link from "next/link";
import styles from "./index.module.scss";

const LinkedButtonText = ({ children }) => <span className={styles.ButtonText}>{children}</span>;

const LinkedButtonIcon = ({ svg, className }) => {
  const TagSvg = svg;
  return <TagSvg className={clsx(styles.ButtonSvg, className)} />;
};

const LinkedButton = ({ className, href, variant, label, children }) => {
  return (
    <Link href={href}>
      <a className={clsx(styles.Button, styles[`variant-${variant}`], className)}>
        {children ? children : label}
      </a>
    </Link>
  );
};

export default LinkedButton;
export { LinkedButtonText, LinkedButtonIcon, LinkedButton };
