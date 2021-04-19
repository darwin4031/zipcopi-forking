import styles from "./FilterOption.module.scss";
import clsx from "clsx";

const FilterOption = ({ stateKey, label, onChange: propOnChange, currentState, isLoading }) => {
  const onChange = (e) => propOnChange(stateKey);

  return (
    <>
      <label className={clsx(styles.Option, currentState === stateKey && styles.isActive)}>
        <input
          className={clsx(styles.OptionInput, "hide-input")}
          type="radio"
          name="FilterSort"
          onChange={onChange}
          disabled={isLoading}
        />
        <div className={styles.OptionIndicator} />
        <div className={styles.OptionLabel}>{label}</div>
      </label>
    </>
  );
};

export default FilterOption;
