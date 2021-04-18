import Head from "next/head";
import Homepage from "~components/pages/LandingPage/HomePage";

function HomePage() {
  return (
    <>
      <Head>
        <title>Zipcopi</title>
      </Head>
      <Homepage />
    </>
  );
}

export default HomePage;
