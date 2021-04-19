import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Controller, useForm, useFormState, useWatch } from "react-hook-form";
import * as yup from "yup";
import Button from "~components/elements/Button";
import Checkbox from "~components/elements/Checkbox";
import GeneralLink from "~components/elements/GeneralLink";
import { H4 } from "~components/elements/Heading";
import { LinkedButtonIcon, LinkedButtonText } from "~components/elements/LinkedButton";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextField";
import {
  AuthUi,
  AuthUiForm,
  AuthUiFormFields,
  AuthUiFormFieldsAlternate,
  AuthUiHeaderIllustration,
  AuthUiOptions,
  AuthUiTitle,
} from "~components/layouts/AuthContainer";
import IconFacebook from "~components/svg/icon-facebook.svg";
import IconLinkedin from "~components/svg/icon-linkedin.svg";
import IllustrationSignup from "~components/svg/illustration-signup.svg";
import { setErrors } from "~utils/index";
import styles from "./index.module.scss";
import SignupRoleSelection from "./SignupRoleSelection";
import { AuthContext } from "~context/auth";

const schema = yup.object().shape({
  email: yup.string().email().required("Please fill this field!"),
  first_name: yup.string().required("Please fill this field!"),
  last_name: yup.string().required("Please fill this field!"),
  password: yup
    .string()
    .matches(/[0-9]+/gm, {
      message: "Password must contain at least 1 number",
    })
    .required("Please fill this field!"),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please fill this field!"),
});

const SignUp = () => {
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);
  const [isSuccessPopup, setSuccessPopup] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(undefined);
  const [role, setRole] = useState("client");
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });
  const email = useWatch({
    control,
    name: "email",
    defaultValue: "",
  });

  const onSubmit = async (data) => {
    if (!agree) {
      setAgreeError({ message: "Please check this option!" });
      return;
    }
    try {
      const payload = {
        ...data,
        role,
      };
      await axios.post("/auth/signup/", payload);
      setSuccessPopup(true);
    } catch (e) {
      const errData = e.response.data;
      setErrors(setError, errData || {});
    }
  };

  const onClickLinkedin = () => {
    const uri =
      process.env.NODE_ENV === "production"
        ? `${window.location.origin}/authentication/linkedin-register-${role}`
        : `http://localhost:3000/authentication/linkedin-register-${role}`;
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&scope=r_liteprofile%20r_emailaddress&state=1234as56&redirect_uri=${uri}`;
    router.push(oauthUrl);
  };

  const getToken = async (accessToken) => {
    try {
      const res = await axios.post("/auth/callback-facebook", {
        access_token: accessToken,
        role,
      });
      localStorage.setItem("token", JSON.stringify(res.data));
      // get profile and save to context
      const resProfile = await axios.get("/auth/profile/");
      setAuth(resProfile.data);
      router.push("/dashboard");
    } catch (e) {
      router.push("/dashboard/signin");
      // TODO: Please use snack to catch exception here
    }
  };

  const onClickFacebook = async () => {
    await window.FB.login(
      async (response) => {
        if (response?.authResponse) {
          const token = response.authResponse.accessToken;
          await getToken(token);
        }
      },
      { scope: "email" }
    );
  };

  return (
    <>
      <AuthUi>
        <AuthUiTitle>Sign up</AuthUiTitle>
        <AuthUiHeaderIllustration>
          <IllustrationSignup />
        </AuthUiHeaderIllustration>
        <AuthUiForm>
          <SignupRoleSelection activeRole={role} setRole={setRole} />
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
                  autoComplete="username"
                  className={styles.field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  className={styles.field}
                  type="password"
                  label="Password"
                  placeholder="Choose your password"
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                  autoComplete="new-password"
                />
              )}
            />
            <Controller
              control={control}
              name="password_confirm"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  className={styles.field}
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                  autoComplete="new-password"
                />
              )}
            />

            <div className={styles.fieldSplit}>
              <div>
                <Controller
                  control={control}
                  name="first_name"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <TextField
                      className={styles.field}
                      type="text"
                      label="Name"
                      placeholder="Insert your name"
                      value={value}
                      onChange={(val) => onChange(val)}
                      error={error}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="last_name"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <TextField
                      className={styles.field}
                      type="text"
                      label="Surname"
                      placeholder="Insert your surname"
                      value={value}
                      onChange={(val) => onChange(val)}
                      error={error}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.checkbox}>
              <Checkbox
                onChange={(e) => {
                  setAgree(e);
                  setAgreeError(undefined);
                }}
                error={agreeError}
              >
                I agree to
                <GeneralLink href="/terms-and-condition" target="_blank" className={styles.link}>
                  Terms and Conditions
                </GeneralLink>
              </Checkbox>
            </div>
            <Button label="Sign Up" isLoading={isSubmitting} onClick={handleSubmit(onSubmit)} />
            <AuthUiFormFieldsAlternate>
              Already have an account?
              <GeneralLink href="/signin">Sign in</GeneralLink>
            </AuthUiFormFieldsAlternate>
          </AuthUiFormFields>
        </AuthUiForm>
        <AuthUiOptions>
          <span>or Signup with</span>
          <Button className={styles.signupFacebook} onClick={onClickFacebook}>
            <LinkedButtonIcon svg={IconFacebook} />
            <LinkedButtonText>Facebook</LinkedButtonText>
          </Button>
          <Button className={styles.signupLinkedin} onClick={onClickLinkedin}>
            <LinkedButtonIcon svg={IconLinkedin} />
            <LinkedButtonText>Linkedin</LinkedButtonText>
          </Button>
        </AuthUiOptions>
      </AuthUi>
      <Popup classNameBox={styles.popupBox} isOpen={isSuccessPopup}>
        <H4>Success</H4>
        <p className={styles.popupContent}>
          Your account has been created, now please check your email to get the verification code!
        </p>
        <Link href={`/dashboard/verify?email=${encodeURIComponent(email)}`}>
          <a className={styles.popupLogin}>Verify</a>
        </Link>
      </Popup>
    </>
  );
};

export default SignUp;
