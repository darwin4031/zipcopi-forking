import Lottie from "react-lottie-player";
import LinkedButton from "~components/elements/LinkedButton";
import ContentGroup from "../ContentGroup";
import AnimationIllustration from "./ethical.json";
import styles from "./index.module.scss";

const Ethical = () => {
  return (
    <div className={styles.ethical}>
      <div className="container">
        <div className={styles.ethical__row}>
          <div className={styles.ethical__col}>
            <div className={styles.ethical__explanation}>
              <div>
                <ContentGroup
                  suptitle="Piece of mind from day one"
                  title="Work with our specialist team of ethically treated copywriters"
                  content="Aorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in."
                />
                <div className={styles.ethical__explanationAction}>
                  <LinkedButton
                    className={styles.ethical__explanationBtn}
                    label="Read more"
                    href="#"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ethical__col}>
            <div className={styles.ethical__illustration}>
              <Lottie
                loop
                play
                animationData={AnimationIllustration}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
                className={styles.ethical__illustrationSvg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ethical;
