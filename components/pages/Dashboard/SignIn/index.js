import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
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
  AuthUiOptions,
  AuthUiTitle,
} from "~components/layouts/AuthContainer";
import authUiStyles from "~components/layouts/AuthContainer/AuthUi.module.scss";
import IconFacebook from "~components/svg/icon-facebook.svg";
import IconLinkedin from "~components/svg/icon-linkedin.svg";
import { AuthContext } from "~context/auth";
import styles from "./index.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required("Please fill this field!"),
  password: yup.string().required("Please fill this field!"),
});

const SignIn = () => {
  const router = useRouter();
  const [isErrorPopup, setErrorPopup] = useState(false);
  const [errorFromAPI, setErrorFromAPI] = useState(null);
  const { setAuth } = useContext(AuthContext);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/signin/", data);
      localStorage.setItem("token", JSON.stringify(res.data));
      // get profile and save to context
      const resProfile = await axios.get("/auth/profile/");
      setAuth(resProfile.data);
      router.push("/dashboard");
    } catch (e) {
      const data = e.response?.data;
      console.error(e);
      setErrorFromAPI(data?.detail ?? "Something wrong, please try again!");
      setErrorPopup(true);
    }
  };

  const onCloseErrorPopup = () => setErrorPopup(false);
  const get_token = async (accessToken) => {
    try {
      const res = await axios.post("/auth/callback-facebook", {
        access_token: accessToken,
      });
      localStorage.setItem("token", JSON.stringify(res.data));

      // get profile and save to context
      const resProfile = await axios.get("/auth/profile/");
      setAuth(resProfile.data);
      router.push("/dashboard");
    } catch (e) {
      setErrorFromAPI("Please register first.");
      setErrorPopup(true);
    }
  };
  const onClickFacebook = async () => {
    await window.FB.login(
      async (response) => {
        if (response?.authResponse) {
          const token = response.authResponse.accessToken;
          await get_token(token);
        }
      },
      { scope: "email" }
    );
  };

  const onClickLinkedin = () => {
    const uri =
      process.env.NODE_ENV === "production"
        ? "https://zipcopi.com/authentication/linkedin-signin"
        : "http://localhost:3000/authentication/linkedin-callback-signin";
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&scope=r_liteprofile%20r_emailaddress&state=1234as56&redirect_uri=${uri}`;
    router.push(oauthUrl);
  };
  return (
    <>
      <AuthUi>
        <AuthUiTitle>Sign In</AuthUiTitle>
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
                  type="email"
                  label="Email"
                  placeholder="Insert your email"
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                  autoComplete="username"
                  className={authUiStyles.field}
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
                  type="password"
                  label="Password"
                  placeholder="Insert your password"
                  value={value}
                  onChange={(val) => onChange(val)}
                  error={error}
                  autoComplete="current-password"
                  className={authUiStyles.field}
                />
              )}
            />
            <div className={styles.signinOtherActions}>
              <div className={styles.signinCheckbox}>
                <Checkbox>Remember me</Checkbox>
              </div>
              <GeneralLink href="/forgot-password">Forgot password?</GeneralLink>
            </div>
            <Button label="Sign In" isLoading={isSubmitting} onClick={handleSubmit(onSubmit)} />
            <AuthUiFormFieldsAlternate>
              Don’t have an account?
              <GeneralLink href="/signup">Sign up now</GeneralLink>
            </AuthUiFormFieldsAlternate>
          </AuthUiFormFields>
        </AuthUiForm>
        <AuthUiOptions>
          <span>or Signin with</span>
          <Button className={styles.signinFacebook} onClick={onClickFacebook}>
            <LinkedButtonIcon svg={IconFacebook} />
            <LinkedButtonText>Facebook</LinkedButtonText>
          </Button>
          <Button className={styles.signinLinkedin} onClick={onClickLinkedin}>
            <LinkedButtonIcon svg={IconLinkedin} />
            <LinkedButtonText>Linkedin</LinkedButtonText>
          </Button>
        </AuthUiOptions>
      </AuthUi>

      <Popup classNameBox={styles.popupBox} isOpen={isErrorPopup} onClose={onCloseErrorPopup}>
        <H4>Error</H4>
        <p className={styles.popupContent}>{errorFromAPI}</p>
        <Button label="Ok" variant="primary" onClick={onCloseErrorPopup} />
      </Popup>
    </>
  );
};

export default SignIn;
