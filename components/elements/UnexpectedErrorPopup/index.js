import Button from "../Button";
import { H3 } from "../Heading";
import Popup from "../Popup";
import styles from "./index.module.scss";

const UnexpectedErrorPopup = ({ isOpen, onClose }) => {
  return (
    <Popup isOpen={isOpen} classNameBox={styles.popup__box} onClose={onClose}>
      <H3 className={styles.popup__title}>Error</H3>
      <div className={styles.popup__content}>Something went wrong, please try again</div>
      <div className={styles.popup__action}>
        <Button label="Okay" variant="primary" onClick={onClose} />
      </div>
    </Popup>
  );
};

export default UnexpectedErrorPopup;
