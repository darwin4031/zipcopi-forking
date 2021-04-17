import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import JobInProgress from "~components/pages/Dashboard/Jobs/in_progress";

const InProgress = () => {
  return (
    <AuthChecker>
      <Head>
        <title>Zipcopi - In Progress Jobs</title>
      </Head>
      <DashboardLayout>
        <JobInProgress />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default InProgress;
