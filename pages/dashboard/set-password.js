import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import MainNavbar from "~components/layouts/components/MainNavbar";
import SetPasswordComponent from "~components/pages/Dashboard/SetPassword";

const SetPassword = () => {
  return (
    <AuthChecker isPublic>
      <Head>
        <title>Zipcopi - Set New Password</title>
      </Head>
      <MainNavbar />
      <SetPasswordComponent />
    </AuthChecker>
  );
};

export default SetPassword;
