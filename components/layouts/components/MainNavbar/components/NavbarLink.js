import clsx from "clsx";
import Link from "next/link";
import styles from "./NavbarLink.module.scss";

const NavbarLink = ({ href, className, children }) => {
  return (
    <Link href={href}>
      <a className={clsx(styles.Link, className)}>{children}</a>
    </Link>
  );
};

export default NavbarLink;
