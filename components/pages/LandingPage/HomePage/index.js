import LandingContainer from "~components/layouts/LandingContainer";
import CreateAccountCTA from "./components/CreateAccountCTA";
import Ethical from "./components/Ethical";
import Hero from "./components/Hero";
import How from "./components/How";
import Pricing from "./components/Pricing";
import Section2 from "./components/Section2";
import Subscribe from "./components/Subscribe";
import Testimonial from "./components/Testimonial";
import Trusted from "./components/Trusted";

const HomePage = () => {
  return (
    <>
      <LandingContainer>
        <Hero />
        <Section2 />
        <How />
        <Ethical />
        <Testimonial />
        <Pricing />
        <CreateAccountCTA />
        <Trusted />
        <Subscribe />
      </LandingContainer>
    </>
  );
};

export default HomePage;
