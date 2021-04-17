import clsx from "clsx";
import Link from "next/link";
import styles from "./index.module.scss";

const GeneralLink = ({ href, className, children, ...props }) => {
  return (
    <Link href={href}>
      <a {...props} className={clsx(styles.GeneralLink, className)}>
        {children}
      </a>
    </Link>
  );
};

export default GeneralLink;
