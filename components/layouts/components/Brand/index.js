import Link from "next/link";
import Logo from "~components/svg/logo.svg";
import styles from "./index.module.scss";

const Brand = () => {
  return (
    <Link href="/">
      <a className={styles.Brand}>
        <Logo className={styles.BrandImage} />
      </a>
    </Link>
  );
};

export default Brand;
