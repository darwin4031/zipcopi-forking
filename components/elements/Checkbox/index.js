import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import IconCheck from "~components/svg/icon-check.svg";
import { getUnique } from "~utils/index";
import ErrorMessage from "../ErrorMessage";
import styles from "./index.module.scss";

const Checkbox = ({
  onChange: propOnChange = () => {},
  error,
  readOnly,
  checked,
  className,
  labelClassName,
  indicatorClassName,
  checkSvgClassName,
  children,
}) => {
  const checkboxRef = useRef();
  const [isChecked, setChecked] = useState(checked);
  const [uniqueID, setUniqueID] = useState();

  useEffect(() => {
    const uniqueID = `input-${getUnique()}`;
    setUniqueID(uniqueID);
    return () => null;
  }, [checkboxRef]);

  const onChange = () => {
    if (readOnly) return false;

    const newValue = !isChecked;
    setChecked(newValue);
    propOnChange(newValue);
  };

  return (
    <div className={clsx(styles.Checkbox, isChecked && styles.isChecked, className)}>
      <label className={clsx(styles.CheckboxWrapper, labelClassName)}>
        <div className={clsx(styles.CheckboxIndicator, indicatorClassName)}>
          <IconCheck className={clsx(styles.CheckboxSvg, checkSvgClassName)} />
        </div>

        <input
          ref={checkboxRef}
          type="checkbox"
          id={uniqueID}
          className={clsx(styles.CheckboxInput, "hide-input")}
          onChange={onChange}
          readOnly={readOnly}
          value={isChecked}
        />

        {children}
      </label>
      {error?.message ? (
        <ErrorMessage className={styles.CheckboxError}>{error.message}</ErrorMessage>
      ) : null}
    </div>
  );
};

export default Checkbox;
