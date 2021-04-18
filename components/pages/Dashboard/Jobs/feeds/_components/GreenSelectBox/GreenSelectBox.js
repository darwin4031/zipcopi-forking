import clsx from "clsx";
import SelectBox from "~components/elements/SelectBox";
import styles from "./GreenSelectBox.module.scss";

const GreenSelectBox = ({
  options,
  className,
  innerClassName,
  defaultValue,
  onChange = () => {},
}) => {
  return (
    <SelectBox
      className={clsx(styles.selectBox, className)}
      innerClassName={clsx(styles.selectBoxInner, innerClassName)}
      dropdownIndicatorClassName={styles.selectBoxIndicator}
      dropdownIndicatorIconClassName={styles.selectBoxIcon}
      reactSelectProps={{
        isSearchable: false,
        classNamePrefix: "adminSelection",
        defaultValue: options[0],
      }}
      onChange={onChange}
      options={options}
      defaultValue={defaultValue}
    />
  );
};

export default GreenSelectBox;
