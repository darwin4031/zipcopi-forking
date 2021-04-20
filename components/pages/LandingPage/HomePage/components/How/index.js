import Lottie from "react-lottie-player";
import GeneralLink from "~components/elements/GeneralLink";
import IllustrationLiveContent from "./illustration-live-content.svg";
import IllustrationReview from "./illustration-review.svg";
import IllustrationSignup from "./illustration-signup.svg";
import IllustrationSubmit from "./illustration-submit.svg";
import styles from "./index.module.scss";
import AnimationsLiveContent from "./live-content.json";
import AnimationsReviewOrder from "./review-order.json";

const Item = ({ icon, name, content, useLottie = null }) => {
  const Icon = icon;
  const Drawer = useLottie ? (
    <Lottie
      loop
      play
      animationData={useLottie}
      rendererSettings={{
        aspectRatio: "xMidYMid slice",
      }}
      className={styles.item__iconSvg}
    />
  ) : (
    <Icon className={styles.item__iconSvg} />
  );

  return (
    <div className={styles.item}>
      <div className={styles.item__inner}>
        <div className={styles.item__icon}>{Drawer}</div>
        <div className={styles.item__name}>{name}</div>
        <div className={styles.item__content}>{content}</div>
        <div className={styles.item__actions}>
          <GeneralLink className={styles.item__link} href="/dashboard/signup">
            Learn more
          </GeneralLink>
        </div>
      </div>
    </div>
  );
};

const How = () => {
  return (
    <div className={styles.how}>
      <div className="container">
        <h3 className={styles.how__title}>How we work...</h3>
        <div className={styles.how__list}>
          <Item
            icon={IllustrationSignup}
            name="Sign up"
            content="Fusce gravida tortor felis dictum risus sagittis id morbi posu justo eleifend libero ultricies"
          />
          <Item
            icon={IllustrationSubmit}
            name="Submit order"
            content="Fusce gravida tortor felis dictum risus sagittis id morbi posu justo eleifend libero ultricies"
          />
          <Item
            icon={IllustrationReview}
            name="Review order"
            content="Fusce gravida tortor felis dictum risus sagittis id morbi posu justo eleifend libero ultricies"
            useLottie={AnimationsReviewOrder}
          />
          <Item
            icon={IllustrationLiveContent}
            name="LIVE Content"
            content="Fusce gravida tortor felis dictum risus sagittis id morbi posu justo eleifend libero ultricies"
            useLottie={AnimationsLiveContent}
          />
        </div>
      </div>
    </div>
  );
};

export default How;
