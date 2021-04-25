import Button, { ButtonIcon } from "~components/elements/Button";
import IconEdit from "~components/svg/icon-edit.svg";
import styles from "./Display.module.scss";

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

const Display = ({ children, isEdit, onEdit = () => {} }) => {
  return (
    <div className={styles.root}>
      <div className={styles.main}>{children}</div>

      {isEdit ? (
        <div className={styles.action}>
          <Button className={styles.actionEdit} type="fab" onClick={onEdit}>
            <ButtonIcon svg={IconEdit} />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

Display.Title = Title;
Display.Header = Header;
Display.Type = Type;
Display.Description = Description;
Display.Year = Year;

export default Display;
