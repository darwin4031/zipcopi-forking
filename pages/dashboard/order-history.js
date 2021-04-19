import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import OrderHistory from "~components/pages/Dashboard/OrderHistory";

const Create = () => {
  return (
    <AuthChecker role="client">
      <Head>
        <title>Zipcopi - Order Histories</title>
      </Head>
      <DashboardLayout>
        <OrderHistory />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Create;
