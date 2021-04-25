import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import UserDetail from "~components/pages/Dashboard/User/detail";

const User = () => {
  return (
    <AuthChecker>
      <Head>
        <title>Zipcopi - Profile</title>
      </Head>
      <DashboardLayout>
        <UserDetail />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default User;
