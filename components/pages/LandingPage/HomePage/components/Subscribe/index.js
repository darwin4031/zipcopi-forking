import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import Button from "~components/elements/Button";
import { H3 } from "~components/elements/Heading";
import Popup from "~components/elements/Popup";
import UnexpectedErrorPopup from "~components/elements/UnexpectedErrorPopup";
import styles from "./index.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Subscribe = () => {
  const [isPosting, setPosting] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [isUnexpectedErrorPopupOpen, setUnexpectedErrorPopupOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValue: { email: "" },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });

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
  const resetState = () => {
    reset({ email: "" });
    setPopupOpen(false);
  };

  return (
    <>
      <div className={styles.subscribe}>
        <div className="container">
          <div className={styles.subscribe__content}>
            Stay up to date with the latest from Zipcopi by subscribing to our weekly newsletter.
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.subscribe__field}>
              <div className={styles.subscribe__inputWrapper}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value, name } }) => {
                    return (
                      <input
                        className={styles.subscribe__input}
                        type="email"
                        placeholder="Your email ..."
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={true}
                      />
                    );
                  }}
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
          <Button label="Okay" variant="primary" onClick={resetState} isLoading={isSubmitting} />
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
