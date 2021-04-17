import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import JobDrafts from "~components/pages/Dashboard/Jobs/drafts";

const Drafts = () => {
  return (
    <AuthChecker isClient>
      <Head>
        <title>Zipcopi - Drafts</title>
      </Head>
      <DashboardLayout>
        <JobDrafts />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Drafts;
