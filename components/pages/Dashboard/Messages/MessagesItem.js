import styles from "./MessagesItem.module.scss";
import IconChevronRight from "~components/svg/icon-chevron-right.svg";
import clsx from "clsx";
import dayjs from "dayjs";

const MessagesItem = ({ date, name, content, isActive, onClick }) => {
  return (
    <button
      className={clsx(styles.root, "reset-button", isActive && styles.isActive)}
      onClick={onClick}
    >
      <div className={styles.flex}>
        <div className={styles.avatar}>
          <img src="/img/dashboard/user.png" alt="User avatar" />
        </div>
        <div className={styles.body}>
          {date ? (
            <div className={styles.date}>
              {dayjs(date + "Z").format("MMM DD HH:mm")}
              {format(new Date(date + "Z"), "MMM dd HH:mm")}
            </div>
          ) : null}
          <div className={styles.name}>{name}</div>
          {content ? <div className={styles.content}>{content}</div> : null}
        </div>
        <div className={styles.arrow}>
          <IconChevronRight className={styles.arrowIcon} />
        </div>
      </div>
    </button>
  );
};

export default MessagesItem;
