import Lottie from "react-lottie-player";
import LinkedButton from "~components/elements/LinkedButton";
import AnimationIllustration from "./header.json";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className="container">
        <div className={styles.hero__wrapper}>
          <div className={styles.hero__inner}>
            <h6 className={styles.hero__suptitle}>We always</h6>
            <h1 className={styles.hero__title}>
              Hire Content Writers Who Exceed Your Expectations
            </h1>
            <div className={styles.hero__content}>
              Zipcopi delivers high-quality, creative content for your business with minimum fuss
              by connecting you to our copywriting experts.
            </div>
            <div className={styles.hero__actions}>
              <div className={styles.hero__actionCol}>
                <LinkedButton
                  className={styles.hero__actionBtn}
                  variant="white"
                  label="Find me a copywriter"
                  href="/dashboard/signup?role=client"
                />
              </div>
              <div className={styles.hero__actionCol}>
                <LinkedButton
                  className={styles.hero__actionBtn}
                  variant="white-secondary"
                  label="I am a copywriter"
                  href="/dashboard/signup?role=writer"
                />
              </div>
            </div>
          </div>
          <div className={styles.hero__illustration}>
            <Lottie
              loop
              play
              animationData={AnimationIllustration}
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
              className={styles.hero__illustrationSvg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
