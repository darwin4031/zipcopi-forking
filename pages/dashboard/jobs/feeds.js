import Head from "next/head";
import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import JobFeeds from "~components/pages/Dashboard/Jobs/feeds";

const Feeds = () => {
  return (
    <AuthChecker role="writer">
      <Head>
        <title>Zipcopi - Feeds</title>
      </Head>
      <DashboardLayout>
        <JobFeeds />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Feeds;
