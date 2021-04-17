import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import JobCreate from "~components/pages/Dashboard/Jobs/create";

const Create = () => {
  return (
    <AuthChecker isClient>
      <Head>
        <title>Zipcopi - Add New Order</title>
      </Head>
      <DashboardLayout>
        <JobCreate />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Create;
