import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
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
import styles from "./index.module.scss";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be 8 characters long.")
    .matches(/(?=.*[0-9])/, { message: "Invalid password. Must contain one number." })
    .required("Please fill this field!"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please fill this" + " field!"),
});

const SetPassword = () => {
  const router = useRouter();
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [popupState, setPopupState] = useState({ title: "", content: "" });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });

  const onSubmit = async (data) => {
    try {
      await axios.post(`/auth/confirm-reset-password/`, {
        email: router.query.email,
        token: router.query.token,
        password: data.password,
      });
      setPopupState({
        title: "Success",
        content: "Your password has been updated, now you can login with the new password!",
      });
    } catch (err) {
      const errData = err?.response?.data;
      if (errData) {
        if (err.response.data.token) {
          setPopupState({ title: "Error", content: err.response.data.token });
        } else if (err.response.data.non_field_errors) {
          setPopupState({
            title: "Error",
            content: err.response.data.non_field_errors[0],
          });
        } else {
          setPopupState({
            title: "Error",
            content: "Something went wrong, please try again!",
          });
        }
      }
    } finally {
      setOpenPopup(true);
    }
  };
  const onClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <AuthUi>
        <AuthUiTitle>Reset Password</AuthUiTitle>
        <AuthUiForm>
          <AuthUiFormFields>
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  type="password"
                  label="New Password"
                  placeholder="Insert new password ..."
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  type="password"
                  label="Confirm Password"
                  placeholder="Insert new password ..."
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                />
              )}
            />

            <Button
              label="Reset Pasword"
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            />
          </AuthUiFormFields>
        </AuthUiForm>
      </AuthUi>
      <Popup classNameBox={styles.popupBox} isOpen={isOpenPopup} onClose={onClosePopup}>
        <H4>{popupState.title}</H4>
        <p className={styles.popupContent}>{popupState.content}</p>
        <Button
          label="Ok"
          variant="primary"
          onClick={onClosePopup}
          nativeProps={{ type: "submit" }}
        />
      </Popup>
    </>
  );
};

export default SetPassword;
