import React from "react";
import Button, { ButtonIcon } from "../Button/Button";
import styles from "./ProfileWorkHistory.module.scss";
import IconEdit from "~components/svg/icon-edit.svg";

const Header = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

const Title = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

const Type = ({ children }) => {
  return <div className={styles.type}>{children}</div>;
};

const Description = ({ children }) => {
  return <div className={styles.description}>{children}</div>;
};

const Year = ({ children }) => {
  return <div className={styles.year}>{children}</div>;
};

const ProfileWorkHistory = ({ children, isMine, onEdit = () => {} }) => {
  return (
    <div className={styles.root}>
      <div className={styles.main}>{children}</div>

      {isMine ? (
        <div className={styles.action}>
          <Button className={styles.actionEdit} type="fab" onClick={onEdit}>
            <ButtonIcon svg={IconEdit} />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

ProfileWorkHistory.Title = Title;
ProfileWorkHistory.Header = Header;
ProfileWorkHistory.Type = Type;
ProfileWorkHistory.Description = Description;
ProfileWorkHistory.Year = Year;

export default ProfileWorkHistory;
