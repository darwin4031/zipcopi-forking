import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormState, useWatch } from "react-hook-form";
import * as yup from "yup";

import Button from "~components/elements/Button";
import { H4 } from "~components/elements/Heading";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextField";
import {
  AuthUi,
  AuthUiForm,
  AuthUiFormFields,
  AuthUiTitle,
} from "~components/layouts/AuthContainer";
import { setErrors } from "~utils/index";
import styles from "../SignIn/index.module.scss";
import verifyStyles from "./index.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required("Please fill this field!"),
  code: yup.string().required("Please fill this field!"),
});

const PopupChildSuccess = () => {
  return (
    <>
      <H4>Success</H4>
      <p className={styles.popupContent}>
        Your email has been successfully activated now you can continue to signin with your new
        account!}
      </p>

      <Link href="/signin">
        <a className={styles.popupLogin}>Signin</a>
      </Link>
    </>
  );
};

const PopupChildInformation = ({ onClose, title, content }) => (
  <>
    <H4>{title}</H4>
    <p className={styles.popupContent}>{content}</p>
    <Button label="Ok" variant="primary" onClick={onClose} />
  </>
);

const Verify = () => {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [PopupChild, setPopupChild] = useState();
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isPopupClosable, setPopupClosable] = useState(true);

  const { control, setValue, setError, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      code: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });
  const email = useWatch({
    control,
    name: "email",
    defaultValue: "",
  });

  useEffect(() => {
    setValue("email", router?.query?.email || "");
  }, [router.query]);

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/verify/", data);
      setPopupClosable(false);
      setPopupChild(() => <PopupChildSuccess />);
      setOpenPopup(true);
    } catch (e) {
      const errData = e?.response?.data;
      setErrors(setError, errData || {});
    }
  };

  const onResendVerify = async () => {
    if (isResending) return false;
    setIsResending(true);
    try {
      await axios.post(`/auth/resend-verification/`, { email });
      setPopupChild(
        <PopupChildInformation
          title="Success"
          content="The verification code has successfully sended to your email!"
          onClose={onClosePopup}
        />
      );
      setOpenPopup(true);
    } catch (e) {
      setPopupChild(
        <PopupChildInformation
          title="Error"
          content="Something went wrong, please try again!"
          onClose={onClosePopup}
        />
      );
      setOpenPopup(true);
    } finally {
      setIsResending(false);
    }
  };

  const onClosePopup = () => {
    setPopupClosable(true);
    setOpenPopup(false);
  };

  return (
    <>
      <AuthUi>
        <AuthUiTitle>Verify Email</AuthUiTitle>
        <AuthUiForm>
          <AuthUiFormFields>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  className={styles.field}
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
            <Controller
              control={control}
              name="code"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  className={styles.field}
                  type="text"
                  label="Verification Code"
                  placeholder="Insert the code from your email"
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                  autoComplete="email"
                />
              )}
            />
            <Button label="Verify" isLoading={isSubmitting} onClick={handleSubmit(onSubmit)} />
            <Button
              className={verifyStyles.resend}
              label="Resend verification code"
              variant="secondary"
              onClick={onResendVerify}
              nativeProps={{ type: "button" }}
              isLoading={isResending}
            />
          </AuthUiFormFields>
        </AuthUiForm>
      </AuthUi>

      <Popup
        classNameBox={styles.popupBox}
        isOpen={isOpenPopup}
        onClose={isPopupClosable ? onClosePopup : () => {}}
      >
        {PopupChild}
      </Popup>
    </>
  );
};

export default Verify;
