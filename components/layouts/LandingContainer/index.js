import MainNavbar from "../components/MainNavbar";
import Footer from "./components/Footer";
import styles from "./index.module.scss";

const LandingContainer = (props) => {
  const { children } = props;
  return (
    <>
      <MainNavbar className={styles.navbar} />
      <div className={styles.homepage}>
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default LandingContainer;
