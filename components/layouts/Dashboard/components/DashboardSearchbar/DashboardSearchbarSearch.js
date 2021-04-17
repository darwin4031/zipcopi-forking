import styles from "./DashboardSearchbarSearch.module.scss";
import IconSearch from "~components/svg/icon-search.svg";

const DashboardSearchbarSearch = () => {
  return (
    <div className={styles.Search}>
      <div className={styles.SearchWrapper}>
        <IconSearch className={styles.SearchIcon} />
        <input className={styles.SearchInput} type="text" placeholder="Search for anything ..." />
      </div>
    </div>
  );
};

export default DashboardSearchbarSearch;
