import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import BillingHistory from "~components/pages/Dashboard/BillingHistory";

const Create = () => {
  return (
    <AuthChecker role="client">
      <Head>
        <title>Zipcopi - Billing Histories</title>
      </Head>
      <DashboardLayout>
        <BillingHistory />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Create;
