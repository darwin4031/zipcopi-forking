import { CircularProgress } from "@material-ui/core";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import styles from "./Stripe.module.scss";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_ID);

const cardStyle = {
  style: {
    base: {
      color: "#49a49c",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#49a49c",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = ({ payment }) => {
  const { id } = payment;
  const [loading, setLoading] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const get_client_secret = async () => {
      try {
        const res = await axios.post("/payment/stripe/create/", { payment_id: id });
        const { client_secret } = res.data;
        setClientSecret(client_secret);
      } catch (e) {
        setError("Please refresh this page, and try it again later.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    get_client_secret();
  }, []);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const { paymentIntent } = payload;
      try {
        await axios.post("/payment/stripe/checking/", {
          payment_id: payment.id,
          stripe_payment_id: paymentIntent.id,
        });
        await mutate(`/jobs/${payment.job}`);
      } catch (e) {
        setError(e.response.data);
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };

  return loading ? (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <CardElement className={styles.cardElement} options={cardStyle} onChange={handleChange} />
        <button disabled={processing || disabled || succeeded} className={styles.button}>
          <span id="button-text">
            {processing ? <div className={styles.spinner} id="spinner" /> : "Pay now"}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className={styles.cardError} role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

const Stripe = ({ payment }) => (
  <Elements stripe={stripePromise}>
    <StripeCheckout payment={payment} />
  </Elements>
);

export default Stripe;
