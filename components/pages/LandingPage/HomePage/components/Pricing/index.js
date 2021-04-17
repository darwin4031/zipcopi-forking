import LinkedButton from "~components/elements/LinkedButton";
import IconCheck from "~components/svg/icon-premium-check.svg";
import IconUncheck from "~components/svg/icon-premium-uncheck.svg";
import styles from "./index.module.scss";

const CheckItem = ({ checked = true, children }) => {
  return (
    <div className={styles.check}>
      <div className={styles.check__icon}>
        {checked ? (
          <IconCheck className={styles.check__iconSvg} />
        ) : (
          <IconUncheck className={styles.check__iconSvg} />
        )}
      </div>
      <div className={styles.check__content}>{children}</div>
    </div>
  );
};

const Service = ({ name, children }) => {
  return (
    <div className={styles.service}>
      <div className={styles.service__box}>
        <div className={styles.service__body}>
          <div className={styles.service__name}>{name}</div>
          <div className={styles.service__list}>{children}</div>
        </div>
        <div className={styles.service__action}>
          <LinkedButton
            className={styles.service__actionBtn}
            label="View Pricing"
            href="#"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className={styles.pricing}>
      <div className="container">
        <div className={styles.pricing__title}>Pricing plans</div>
        <div className={styles.pricing__content}>
          With our certified writers. there is no need to spend hours trawling websites for
          copywriting talent.just submit your brief and we'll do the rest! Your order is usually
          completed within 48 hours, leaving you to get on with growing your business.
        </div>
        <div className={styles.pricing__services}>
          <div className={styles.pricing__servicesWrapper}>
            <Service name="Basic">
              <CheckItem>Open to all writer</CheckItem>
              <CheckItem checked={false}>No amends</CheckItem>
            </Service>
            <Service name="Premium">
              <CheckItem>Open to writers with a required verification level</CheckItem>
              <CheckItem>3 amends</CheckItem>
            </Service>
            <Service name="Bespoke">
              <CheckItem>Can put any information in any field to create a customer job</CheckItem>
              <CheckItem>
                Will require an admin to approve before putting live to writers
              </CheckItem>
              <CheckItem>Unlimited amends</CheckItem>
            </Service>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
