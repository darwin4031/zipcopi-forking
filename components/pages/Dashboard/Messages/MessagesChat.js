import clsx from "clsx";
import dayjs from "dayjs";
import styles from "./MessagesChat.module.scss";

/**
 * MessagesChat
 * @param {Object} props
 * @param {Number} props.date Unix timestamp in miliseconds
 * @param {String} props.name
 * @param {String} props.message
 * @param {String | Number} props.userId
 * @param {String | Number} props.currentUserId
 */
const MessagesChat = ({ date, name, message, userId, currentUserId }) => {
  return (
    <div className={clsx(styles.root, userId === currentUserId && styles.isMine)}>
      <div className={styles.top}>
        <div className={styles.name}>{userId === currentUserId ? "You" : name}</div>
        {date ? (
          <div className={styles.date}>{dayjs(date + "Z").format("MMM DD - HH:mm")}</div>
        ) : null}
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default MessagesChat;
