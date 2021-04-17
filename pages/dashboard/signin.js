import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import MainNavbar from "~components/layouts/components/MainNavbar";
import SignInComponent from "~components/pages/Dashboard/SignIn";

const SignIn = () => {
  return (
    <AuthChecker isPublic>
      <Head>
        <title>Zipcopi - Signin</title>
      </Head>
      <MainNavbar />
      <SignInComponent />
    </AuthChecker>
  );
};

export default SignIn;
