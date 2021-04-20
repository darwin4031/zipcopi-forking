import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import MainNavbar from "~components/layouts/components/MainNavbar";
import SignUpComponent from "~components/pages/SignUp";

const SignUp = () => {
  return (
    <AuthChecker isPublic>
      <Head>
        <title>Zipcopi - SignUp</title>
      </Head>
      <MainNavbar />
      <SignUpComponent />
    </AuthChecker>
  );
};

export default SignUp;
