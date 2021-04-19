import styles from "./FilterSelectionItem.module.scss";
import clsx from "clsx";

const FilterSelectionItem = ({
  stateKey,
  isSelected,
  isLoading,
  onChange = () => {},
  children,
}) => {
  return (
    <label className={clsx(styles.Item, isSelected && styles.isSelected)}>
      <input
        className={clsx(styles.ItemInput, "hide-input")}
        type="checkbox"
        onChange={onChange}
        disabled={isLoading}
        checked={isSelected}
      />
      <div className={styles.FilterSelectionItem}>{children}</div>
    </label>
  );
};

export default FilterSelectionItem;
