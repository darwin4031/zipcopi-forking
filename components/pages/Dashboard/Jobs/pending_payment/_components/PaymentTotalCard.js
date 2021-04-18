import Button from "~components/elements/Button";
import dayjs from "dayjs";
import styles from "./PaymentTotalCard.module.scss";

const PaymentTotalCard = (props) => {
  const { data, activeStep, setActiveStep } = props;
  const {
    deadline_date,
    bulk_quantity,
    unit_sub_total,
    sub_total,
    vat,
    total,
    service_fee,
  } = data;
  return (
    <div className={styles.totalCardContainer}>
      <div className={styles.cardItem}>
        <p />
        <p className={styles.text}>
          {bulk_quantity} x {unit_sub_total}
        </p>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardItem}>
        <p className={styles.text}>Sub Total</p>
        <p className={styles.text}>${sub_total}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardItem}>
        <p className={styles.text}>Service Fee</p>
        <p className={styles.text}>${service_fee}</p>
      </div>
      <div className={styles.cardItem}>
        <p className={styles.text}>VAT</p>
        <p className={styles.text}>${vat}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardItem}>
        <p className={styles.text}>Total</p>
        <p className={styles.text}>${total}</p>
      </div>
      <div className={styles.cardItem}>
        <p className={styles.textLight}>Delivery</p>
        <p className={styles.textLight}>{dayjs(deadline_date + "Z").format("MMM, DD, YYYY")}</p>
      </div>
    </div>
  );
};

export default PaymentTotalCard;
