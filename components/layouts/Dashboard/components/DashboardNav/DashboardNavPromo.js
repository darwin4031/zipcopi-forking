import Button from "~components/elements/Button";
import IconCreditCard from "~components/svg/icon-credit-card.svg";
import styles from "./DashboardNavPromo.module.scss";

const DashboardNavPromo = () => {
  return (
    <div className={styles.Promo}>
      <div className={styles.PromoIcon}>
        <IconCreditCard className={styles.PromoSvg} />
      </div>
      <div className={styles.PromoTitle}>
        Earn <b>$25</b> for the first payment
      </div>
      <Button className={styles.PromoButton} label="Make a Payment" variant="primary" />
    </div>
  );
};

export default DashboardNavPromo;
