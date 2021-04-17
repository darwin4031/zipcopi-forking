import Head from "next/head";
import About from "~components/pages/LandingPage/About";

function HomePage() {
  return (
    <>
      <Head>
        <title>Zipcopi | About</title>
      </Head>
      <About />
    </>
  );
}

export default HomePage;
