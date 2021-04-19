import styles from "./FilterTitle.module.scss";

const FilterTitle = ({ children }) => {
  return <h3 className={styles.FilterTitle}>{children}</h3>;
};

export default FilterTitle;
