import styles from "./Radio.module.scss";
import clsx from "clsx";

const Radio = ({
  name,
  options,
  className,
  labelClassName,
  ItemWrapper = ({ children }) => <>{children}</>,
  value: propSelectedItem,
  onChange: propOnChange,
  defaultValue,
}) => {
  const onChange = (e, checkedOption) => {
    if (e.target.checked) {
      propOnChange?.(checkedOption);
    }
  };

  return (
    <div className={clsx(styles.radio, className)}>
      {options.map((item, i) => (
        <ItemWrapper key={i}>
          <label
            className={clsx(
              styles.radioItem,
              propSelectedItem && propSelectedItem.value === item.value && styles.isSelected,
              labelClassName
            )}
          >
            <input
              type="radio"
              className="hide-input"
              name={name}
              value={item.value}
              defaultChecked={defaultValue ? defaultValue.value === item.value : false}
              onChange={(e) => onChange(e, item)}
            />
            <div className={styles.radioIndicator} />
            <div className={styles.radioText}>{item.label}</div>
          </label>
        </ItemWrapper>
      ))}
    </div>
  );
};

export default Radio;
