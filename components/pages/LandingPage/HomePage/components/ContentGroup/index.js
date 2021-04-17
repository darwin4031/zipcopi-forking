import styles from "./index.module.scss";

const ContentGroup = ({ suptitle, title, content }) => {
  return (
    <div className={styles.contentGroup}>
      <h6 className={styles.contentGroup__suptitle}>{suptitle}</h6>
      <h3 className={styles.contentGroup__title}>{title}</h3>
      <div className={styles.contentGroup__content}>{content}</div>
    </div>
  );
};

export default ContentGroup;
