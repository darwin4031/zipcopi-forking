import LinkedButton from "~components/elements/LinkedButton";
import styles from "./index.module.scss";

const CreateAccountCTA = () => {
  return (
    <div className={styles.create}>
      <div className="container">
        <div className={styles.create__box}>
          <div className={styles.create__inner}>
            <div className={styles.create__suptitle}>Ready to start</div>
            <div className={styles.create__title}>Create your account today?</div>
            <div className={styles.create__action}>
              <LinkedButton
                href="/signup"
                className={styles.create__actionBtn}
                label="Get Started"
                variant="white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountCTA;
