import { useState } from "react";

import { H3, H4 } from "~components/elements/Heading";
import JobDetail from "./JobDetail";
import styles from "./Payment.module.scss";
import PaymentMethod from "./PaymentMethod";
import PaymentTotalCard from "./PaymentTotalCard";

const Payment = (props) => {
  const { data } = props;
  const [activeStep, setActiveStep] = useState(1);
  const [method, setMethod] = useState("stripe");
  return (
    <section className={styles.paymentContainer}>
      <div className={styles.titleBlock}>
        <H3 className={styles.title}>Payment</H3>
      </div>
      <div className={styles.subTitleBlock}>
        <H4>Summary</H4>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <JobDetail data={data} />
          <PaymentMethod payment={data.payment} method={method} setMethod={setMethod} />
        </div>
        <PaymentTotalCard data={data} activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
    </section>
  );
};

export default Payment;
