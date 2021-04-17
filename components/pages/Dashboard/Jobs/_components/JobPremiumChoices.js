import clsx from "clsx";
import { useState } from "react";
import Button, { ButtonIcon } from "~components/elements/Button";
import ErrorMessage from "~components/elements/ErrorMessage";
import Popup from "~components/elements/Popup";
import IconChevronDown from "~components/svg/icon-chevron-down.svg";
import IconClose from "~components/svg/icon-close.svg";
import IconCheck from "~components/svg/icon-premium-check.svg";
import IconUncheck from "~components/svg/icon-premium-uncheck.svg";
import styles from "./JobPremiumChoices.module.scss";

const Item = ({ price, label, onSelect, children }) => {
  return (
    <div>
      <div className={styles.popupItem}>
        <div className={styles.popupItemPrice}>{price}</div>
        <div className={styles.popupItemName}>{label}</div>
        <div className={styles.popupList}>{children}</div>
        <Button
          className={styles.popupItemBtn}
          label="Select"
          variant="primary"
          onClick={onSelect}
        />
      </div>
    </div>
  );
};

const ListItemCheck = ({ children }) => {
  return (
    <div className={styles.popupListItem}>
      <div className={styles.popupListIcon}>
        <IconCheck />
      </div>
      <div className={styles.popupListTextWrapper}>
        <div className={styles.popupListText}>{children}</div>
      </div>
    </div>
  );
};

const ListItemUncheck = ({ children }) => {
  return (
    <div className={styles.popupListItem}>
      <div className={styles.popupListIcon}>
        <IconUncheck />
      </div>
      <div className={styles.popupListTextWrapper}>
        <div className={styles.popupListText}>{children}</div>
      </div>
    </div>
  );
};

const premiumJobEnum = {
  basic: "Basic",
  premium: "Premium",
  bespoke: "Bespoke",
};
const JobPremiumChoices = ({ className, label, placeholder, value, error, onChange }) => {
  const [isSelectingPremium, setSelectingPremium] = useState(false);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.label}>{label}</div>

      <button
        className={clsx(styles.button, "reset-button")}
        onClick={() => setSelectingPremium(true)}
      >
        <div className={styles.input}>
          {value ? (
            <div className={styles.value}>{premiumJobEnum[value]}</div>
          ) : (
            <div className={clsx(styles.value, styles.placeholder)}>{placeholder}</div>
          )}

          <div className={styles.icon}>
            <IconChevronDown />
          </div>
        </div>
      </button>

      <Popup
        className={styles.popup}
        classNameBox={styles.popupBox}
        isOpen={isSelectingPremium}
        onClose={() => setSelectingPremium(false)}
      >
        <div className={styles.popupMobile}>
          <h3 className={styles.popupMobileTitle}>Select Premium</h3>
          <Button
            className={styles.popupMobileClose}
            type="fab"
            onClick={() => setSelectingPremium(false)}
          >
            <ButtonIcon svg={IconClose} />
          </Button>
        </div>
        <div className={styles.popupFlex}>
          <Item
            price="£9,99"
            label="Basic"
            onSelect={() => {
              onChange("basic");
              setSelectingPremium(false);
            }}
          >
            <ListItemCheck>Open to all writers</ListItemCheck>
            <ListItemUncheck>No amends</ListItemUncheck>
          </Item>
          <Item
            price="£19,99"
            label="Premium"
            onSelect={() => {
              onChange("premium");
              setSelectingPremium(false);
            }}
          >
            <ListItemCheck>Open to writers with a required verification level</ListItemCheck>
            <ListItemCheck>3 Amends</ListItemCheck>
          </Item>
          <Item
            price="£39,99"
            label="Bespoke"
            onSelect={() => {
              onChange("bespoke");
              setSelectingPremium(false);
            }}
          >
            <ListItemCheck>
              Can put any information in any field to crate a customer job
            </ListItemCheck>
            <ListItemCheck>
              Will require an admin to approve before putting live to writers
            </ListItemCheck>
            <ListItemCheck>Unlimited Amends</ListItemCheck>
          </Item>
        </div>
      </Popup>

      {error?.message ? <ErrorMessage>{error.message}</ErrorMessage> : null}
    </div>
  );
};

export default JobPremiumChoices;
