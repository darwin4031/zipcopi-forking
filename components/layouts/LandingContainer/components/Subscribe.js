import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "~components/Button/Button";
import { H3 } from "~components/Heading/Heading";
import Popup from "~components/Popup/Popup";
import UnexpectedErrorPopup from "~components/UnexpectedErrorPopup/UnexpectedErrorPopup";
import styles from "./Subscribe.module.scss";

const Subscribe = () => {
  const [isPosting, setPosting] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [isUnexpectedErrorPopupOpen, setUnexpectedErrorPopupOpen] = useState(false);

  const onSubmit = (values) => {
    if (isPosting) return false;
    setPosting(true);

    axios
      .post(`/newsletters/subscribe/`, values)
      .then((res) => {
        setPopupOpen(true);
        setPosting(false);
        setPopupContent("You've successfully subscribed to our newsletter");
      })
      .catch((err) => {
        if (err?.response?.data?.email) {
          setPopupContent(err.response.data.email);
          setPopupOpen(true);
          setPosting(false);
        } else {
          // fallback error
          setUnexpectedErrorPopupOpen(true);
          setPosting(false);
        }

        console.error("Subscribe Err", { err });
      });
  };

  const { handleChange, handleSubmit, handleReset, values } = useFormik({
    initialValues: { email: "" },
    onSubmit: onSubmit,
  });

  const resetState = () => {
    handleReset();
    setPopupOpen(false);
  };

  return (
    <>
      <div className={styles.subscribe}>
        <div className="container">
          <div className={styles.subscribe__content}>
            Stay up to date with the latest from Zipcopi by subscribing to our weekly newsletter.
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.subscribe__field}>
              <div className={styles.subscribe__inputWrapper}>
                <input
                  className={styles.subscribe__input}
                  type="email"
                  placeholder="Your email ..."
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className={styles.subscribe__action}>
                <Button
                  className={styles.subscribe__actionBtn}
                  label="Subscribe"
                  variant="primary"
                  isLoading={isPosting}
                  nativeProps={{ type: "submit" }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Popup className={styles.popup} classNameBox={styles.popup__box} isOpen={isPopupOpen}>
        <H3 className={styles.popup__title}>Success</H3>
        <div className={styles.popup__content}>{popupContent}</div>
        <div className={styles.popup__action}>
          <Button label="Okay" variant="primary" onClick={resetState} />
        </div>
      </Popup>
      <UnexpectedErrorPopup
        isOpen={isUnexpectedErrorPopupOpen}
        onClose={() => setUnexpectedErrorPopupOpen(false)}
      />
    </>
  );
};

export default Subscribe;
