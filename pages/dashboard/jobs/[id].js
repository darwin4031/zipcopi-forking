import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import AuthChecker from "~components/elements/AuthChecker";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import DashboardLayout from "~components/layouts/Dashboard";
import JobCompleted from "~components/pages/Dashboard/Jobs/completed";
import JobDraft from "~components/pages/Dashboard/Jobs/draft";
import JobPendingPayment from "~components/pages/Dashboard/Jobs/pending_payment";
import JobPlaceOrder from "~components/pages/Dashboard/Jobs/place_order";
import JobPlaceQuote from "~components/pages/Dashboard/Jobs/place_quote";
import JobReview from "~components/pages/Dashboard/Jobs/review";
import JobRevising from "~components/pages/Dashboard/Jobs/revising";
import JobWriting from "~components/pages/Dashboard/Jobs/writing";
import { AuthContext } from "~context/auth";
import { fetcher } from "~utils/index";

const JobRoleChecker = (props) => {
  const router = useRouter();
  const { data, children } = props;
  const { auth } = useContext(AuthContext);
  const role = auth?.role;
  const userId = auth?.id;
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (role === "client") {
      if (data.client !== userId) {
        router.push("/404");
      }
    } else if (role === "writer") {
      if (["draft", "place_quote"].includes(data.status)) {
        router.push("/404");
      }
      if (data.status !== "place_order" && data.writer !== userId) {
        router.push("/404");
      }
    }
    setChecking(false);
  }, []);

  return !checking ? children : null;
};

const JobChooser = ({ data }) => {
  let comp;
  if (data.status === "draft") {
    comp = <JobDraft data={data} />;
  } else if (data.status === "place_order") {
    comp = <JobPlaceOrder data={data} />;
  } else if (data.status === "place_quote") {
    comp = <JobPlaceQuote data={data} />;
  } else if (data.status === "pending_payment") {
    comp = <JobPendingPayment data={data} />;
  } else if (data.status === "writing") {
    comp = <JobWriting data={data} />;
  } else if (data.status === "review") {
    comp = <JobReview data={data} />;
  } else if (data.status === "revising") {
    comp = <JobRevising data={data} />;
  } else if (data.status === "completed") {
    comp = <JobCompleted data={data} />;
  }
  return <JobRoleChecker data={data}>{comp}</JobRoleChecker>;
};

const JobDetail = () => {
  const router = useRouter();
  const jobId = router.query.id;
  const { data, error } = useSWR(`/jobs/${jobId}`, fetcher);

  useEffect(() => {
    if (error) {
      router.push("/404");
    }
  }, [error]);

  return (
    <AuthChecker>
      <Head>
        <title>Zipcopi - Job Detail</title>
      </Head>
      <DashboardLayout>{!data ? <LoadingWrapper /> : <JobChooser data={data} />}</DashboardLayout>
    </AuthChecker>
  );
};

export default JobDetail;
