import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm, useFormState, useWatch } from "react-hook-form";
import * as yup from "yup";
import Button from "~components/elements/Button";
import { H4 } from "~components/elements/Heading";
import LinkedButton from "~components/elements/LinkedButton";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextField";
import {
  AuthUi,
  AuthUiForm,
  AuthUiFormFields,
  AuthUiTitle,
} from "~components/layouts/AuthContainer";
import styles from "./index.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPassword = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [popupState, setPopupState] = useState({ title: "", content: "" });
  const [isSuccessScreen, setSuccessScreen] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });
  const email = useWatch({ control, name: "email", defaultValue: "" });

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/reset-password/", {
        email: data.email,
        redirect_url: `${window.location.origin}/set-password`,
      });
      setSuccessScreen(true);
    } catch (err) {
      if (err?.response?.data && err.response.data.email) {
        setPopupState({ title: "Error", content: err.response.data.email });
        setOpenPopup(true);
      } else {
        setPopupState({
          title: "Error",
          content: "Something went wrong, please try again!",
        });
        setOpenPopup(true);
      }
    }
  };

  const onTryAgain = () => {
    setSuccessScreen(false);
  };

  const onClosePopup = () => {
    setOpenPopup(false);
  };
  return (
    <>
      {!isSuccessScreen ? (
        <AuthUi>
          <AuthUiTitle>Forgot Password</AuthUiTitle>
          <AuthUiForm onSubmit={handleSubmit(onSubmit)}>
            <AuthUiFormFields>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="Insert your email"
                    value={value}
                    onChange={(val) => onChange(val)}
                    error={error}
                    autoComplete="email"
                  />
                )}
              />
              <Button label="Send a password reset email" isLoading={isSubmitting} />
            </AuthUiFormFields>
          </AuthUiForm>
        </AuthUi>
      ) : (
        <AuthUi>
          <AuthUiTitle>Email Sent!</AuthUiTitle>
          <div className={styles.body}>
            <div className={styles.content}>
              We sent a message to <b>{email}</b> so you can pick your new password.
            </div>
            <div className={styles.actions}>
              <div className={styles.actions__col}>
                <Button label="Try again" variant="secondary" onClick={onTryAgain} />
              </div>
              <div className={styles.actions__col}>
                <LinkedButton href="/signin" label="Back to login" variant="primary" />
              </div>
            </div>
          </div>
        </AuthUi>
      )}
      <Popup classNameBox={styles.popupBox} isOpen={isOpenPopup} onClose={onClosePopup}>
        <H4>{popupState.title}</H4>
        <p className={styles.popupContent}>{popupState.content}</p>
        <Button label="Ok" variant="primary" onClick={onClosePopup} />
      </Popup>
    </>
  );
};

export default ForgotPassword;
