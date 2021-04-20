import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import MainNavbar from "~components/layouts/components/MainNavbar";
import ForgotPasswordComponent from "~components/pages/Dashboard/ForgotPassword";

const ForgotPassword = () => {
  return (
    <AuthChecker isPublic>
      <Head>
        <title>Zipcopi - Reset Password</title>
      </Head>
      <MainNavbar />
      <ForgotPasswordComponent />
    </AuthChecker>
  );
};

export default ForgotPassword;
