import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import MainNavbar from "~components/layouts/components/MainNavbar";
import VerifyComponent from "~components/pages/Dashboard/Verify";

const Verify = () => {
  return (
    <AuthChecker isPublic>
      <Head>
        <title>Zipcopi - Verify Email</title>
      </Head>
      <MainNavbar />
      <VerifyComponent />
    </AuthChecker>
  );
};

export default Verify;
