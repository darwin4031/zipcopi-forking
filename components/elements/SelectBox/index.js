import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import IconChevronDown from "~components/svg/icon-chevron-down.svg";
import IconClose from "~components/svg/icon-close.svg";
import { getUnique } from "~utils/index";
import ErrorMessage from "../ErrorMessage";
import styles from "./index.module.scss";

const DropdownIndicator = ({ className, iconClassName }) => (
  <div className={clsx(styles.DropdownIndicator, className)}>
    <IconChevronDown className={iconClassName} />
  </div>
);

const MultiValueRemove = ({ innerProps }) => {
  const { ref, ...restInnerProps } = innerProps;

  return (
    <div {...restInnerProps} ref={ref} className={styles.MultiValueRemove}>
      <IconClose />
    </div>
  );
};

const ClearIndicator = ({ innerProps }) => {
  const { ref, ...restInnerProps } = innerProps;

  return (
    <div {...restInnerProps} ref={ref} className={styles.ClearIndicator}>
      <IconClose />
    </div>
  );
};

const SelectBox = ({
  label,
  options,
  onChange = (selectedOptions) => {},
  className,
  innerClassName,
  dropdownIndicatorClassName,
  dropdownIndicatorIconClassName,
  controlStyles,
  singleValueStyles,
  isMulti,
  placeholder,
  error,
  reactSelectProps,
  value,
}) => {
  const selectRef = useRef();
  const [uniqueID, setUniqueID] = useState();

  useEffect(() => {
    const uniqueID = `select-${getUnique()}`;
    setUniqueID(uniqueID);
    return () => null;
  }, [selectRef]);

  return (
    <div className={clsx(styles.selectBoxRoot, className)}>
      {label ? (
        <label htmlFor={uniqueID} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div className={clsx(styles.selectBoxInner, innerClassName)}>
        <Select
          {...reactSelectProps}
          placeholder={placeholder}
          onChange={onChange}
          isMulti={isMulti}
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: 0,
              padding: "5px 0px",
              borderRadius: 0,
              border: "none",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: state.isFocused ? "#49a49c" : "#cecece",
              boxShadow: "none",

              "&:hover": {
                borderBottom: "1px solid #49a49c",
              },

              ...controlStyles,
            }),

            input: (provided, state) => ({
              ...provided,
              padding: "0px",
              margin: "0px",
            }),

            dropdownIndicator: (provided, state) => ({
              ...provided,
              height: "24px",
            }),

            valueContainer: (provided, state) => ({
              ...provided,
              padding: "0px",
            }),

            placeholder: (provided, state) => ({
              ...provided,
              color: "#cecece",
            }),

            multiValue: (provided, state) => ({
              ...provided,
              borderRadius: "4px",
              backgroundColor: "#6887C1",
            }),

            multiValueLabel: (provided, state) => ({
              ...provided,
              padding: "4px 10px",
              fontWeight: 600,
              color: "#fff",
            }),

            singleValue: (provided, state) => ({
              ...provided,
              ...singleValueStyles,
            }),
          }}
          components={{
            IndicatorSeparator: null,
            DropdownIndicator: () => (
              <DropdownIndicator
                className={dropdownIndicatorClassName}
                iconClassName={dropdownIndicatorIconClassName}
              />
            ),
            MultiValueRemove: MultiValueRemove,
            ClearIndicator: ClearIndicator,
          }}
          options={options}
          value={value}
        />

        {error?.message ? <ErrorMessage>{error.message}</ErrorMessage> : null}
      </div>
    </div>
  );
};

export default SelectBox;
