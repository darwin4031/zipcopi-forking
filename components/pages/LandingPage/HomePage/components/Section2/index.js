import Lottie from "react-lottie-player";
import LinkedButton from "~components/elements/LinkedButton";
import ContentGroup from "../ContentGroup";
import styles from "./index.module.scss";
import ServiceBlogs from "./service-blogs.svg";
import ServiceCustomer from "./service-customer.svg";
import ServiceMarketing from "./service-marketing.svg";
import ServicePress from "./service-press.svg";
import ServiceProduct from "./service-product.svg";
import ServiceWebCopy from "./service-web-copy.svg";
import AnimationIllustration from "./sit-back.json";

const Service = ({ icon, name, content }) => {
  const Icon = icon;
  return (
    <div className={styles.service}>
      <div className={styles.service__inner}>
        <div className={styles.service__icon}>
          <Icon className={styles.service__iconSvg} />
        </div>
        <div className={styles.service__name}>{name}</div>
        <div className={styles.service__content}>{content}</div>
      </div>
    </div>
  );
};

const CTA = () => {
  return (
    <div className={styles.cta}>
      <div className={styles.cta__title}>Find the best writers</div>
      <div className={styles.cta__content}>
        By completing our simple brief template, your job reaches the writer with the best
        expertise to deliver to the highest level.
      </div>
      <LinkedButton
        href="/dashboard/signup"
        className={styles.cta__btn}
        label="Get Started"
        variant="white"
      />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className={styles.section2}>
      <div className="container">
        <div className={styles.section2__row}>
          <div className={styles.section2__col}>
            <div className={styles.section2__explanation}>
              <ContentGroup
                suptitle="Sit back and relax!"
                title="Hire for any scope of work with complete piece of mind..."
                content="We work with professional writers across the world to bring you a copywriting service which is both affordable and efficient. From first registration you will have access to our certified writers saving you time and allowing your project to flow efficiently."
              />
            </div>
            <div className={styles.section2__illustration}>
              <Lottie
                loop
                play
                animationData={AnimationIllustration}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
                className={styles.section2__illustrationSvg}
              />
            </div>
          </div>
          <div className={styles.section2__col}>
            <div className={styles.section2__services}>
              <Service icon={ServiceBlogs} name="Blogs" content="Lorem ipsum dolor sit amet" />
              <Service
                icon={ServiceWebCopy}
                name="Website copy"
                content="Lorem ipsum dolor sit amet"
              />
              <Service
                icon={ServiceProduct}
                name="Product Description"
                content="Lorem ipsum dolor sit amet"
              />
              <Service
                icon={ServicePress}
                name="Press Release"
                content="Lorem ipsum dolor sit amet"
              />
              <Service
                icon={ServiceMarketing}
                name="Marketing Email"
                content="Lorem ipsum dolor sit amet"
              />
              <Service
                icon={ServiceCustomer}
                name="Customer Jobs"
                content="Lorem ipsum dolor sit amet"
              />
            </div>

            <div className={styles.section2__cta}>
              <CTA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
