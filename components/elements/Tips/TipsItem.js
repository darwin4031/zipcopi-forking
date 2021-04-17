import IconTips from "~components/svg/icon-tips.svg";
import styles from "./TipsItem.module.scss";

const TipsItem = ({ title, content }) => {
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <div className={styles.icon}>
          <IconTips />
        </div>
        <div className={styles.body}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default TipsItem;
