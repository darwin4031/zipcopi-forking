import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Button, { ButtonText } from "~components/elements/Button";
import useOpen from "~hooks/useOpen";
import ConfirmationPopup from "~components/elements/ConfirmationPopup";
import styles from "./PaymentTotalCard.module.scss";

const PaymentTotalCard = (props) => {
  const { data } = props;
  const router = useRouter();
  const { id, deadline, bulk_quantity, unit_sub_total, sub_total, vat, total, service_fee } = data;
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useOpen();

  const onDeleteDraft = async () => {
    try {
      await axios.delete(`/jobs/${id}`);
      router.push("/dashboard/jobs/in-progress");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className={styles.totalCardContainer}>
        <div className={styles.wrapper}>
          <div className={styles.cardItem}>
            <p />
            <p className={styles.text}>
              {bulk_quantity} x £ {unit_sub_total}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.cardItem}>
            <p className={styles.text}>Sub Total</p>
            <p className={styles.text}>£ {sub_total}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.cardItem}>
            <p className={styles.text}>Service Fee</p>
            <p className={styles.text}>£ {service_fee}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.text}>VAT</p>
            <p className={styles.text}>£ {vat}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.cardItem}>
            <p className={styles.text}>Total</p>
            <p className={styles.text}>£ {total}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.textLight}>Delivery</p>
            <p className={styles.textLight}>est. {deadline} days</p>
          </div>
        </div>
        <Button className={styles.laterBtn} variant="error" onClick={onOpenError}>
          <ButtonText>Cancel Order</ButtonText>
        </Button>
      </div>
      <ConfirmationPopup
        title="Are you sure you want delete this draft?"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus neque turpis, dapibus"
        cancelText="BACK"
        submitText="CANCEL ORDER"
        isOpen={isOpenError}
        onCancel={onCloseError}
        onSubmit={onDeleteDraft}
      />
    </>
  );
};

export default PaymentTotalCard;
