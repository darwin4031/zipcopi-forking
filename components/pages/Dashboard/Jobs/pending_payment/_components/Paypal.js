import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { mutate } from "swr";
import styles from "./Paypal.module.scss";
import axios from "axios";

const initialOptions = {
  "client-id": process.env.PAYPAL_CLIENT_ID,
  currency: "GBP",
};

const Paypal = ({ payment }) => {
  const onCreateOrder = async () => {
    try {
      const res = await axios.post("/payment/paypal/create/", { payment_id: payment.id });
      const data = res.data;
      return data.id;
    } catch (e) {
      console.error(e);
    }
  };
  const onApprove = async (data, actions) => {
    try {
      await axios.post("/payment/paypal/capture/", {
        payment_id: payment.id,
        order_id: data.orderID,
      });
      await mutate(`/jobs/${payment.job}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.container}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={onCreateOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
