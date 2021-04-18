import Checkbox from "~components/elements/Checkbox";
import styles from "./PaymentMethod.module.scss";
import { useState } from "react";

const PaymentMethod = () => {
  const [method, setMethod] = useState("stripe");

  const onChangeMethod = (checked, key) => {
    if (checked) {
      setMethod(key);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.cardTitle}>Payment method</h3>
      <div className={styles.methodBlock}>
        <Checkbox
          className={styles.methodCheckbox}
          labelClassName={styles.methodCheckboxLabel}
          indicatorClassName={styles.methodCheckboxIndicator}
          checked={method === "stripe"}
          onChange={(checked) => onChangeMethod(checked, "stripe")}
        >
          Credit card
        </Checkbox>
        <Checkbox
          className={styles.methodCheckbox}
          labelClassName={styles.methodCheckboxLabel}
          indicatorClassName={styles.methodCheckboxIndicator}
          checked={method === "paypal"}
          onChange={(checked) => onChangeMethod(checked, "paypal")}
        >
          Paypal
        </Checkbox>
      </div>
    </div>
  );
};

export default PaymentMethod;
