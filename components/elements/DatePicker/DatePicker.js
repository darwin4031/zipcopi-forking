import clsx from "clsx";
import ReactDatePicker from "react-datepicker";
import IconCalendar from "~components/svg/icon-calendar.svg";
import getDateTomorrow from "~utils/getDateTomorrow";
import ErrorMessage from "../ErrorMessage";
import styles from "./DatePicker.module.scss";

const DatePicker = ({
  className,
  label,
  placeholder,
  value,
  minDate = getDateTomorrow(),
  onChange,
  error: errorMsg,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrapper}>
        <ReactDatePicker
          className={styles.datePickerInput}
          wrapperClassName={styles.datePicker}
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          selected={value}
          minDate={minDate}
          onChange={onChange}
        />
        <div className={styles.icon}>
          <IconCalendar />
        </div>
      </div>

      {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : null}
    </div>
  );
};

export default DatePicker;
