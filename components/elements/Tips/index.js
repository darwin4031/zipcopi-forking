import styles from "./Tips.module.scss";
import TipsItem from "./TipsItem";

const Tips = ({ data }) => {
  return (
    <div className={styles.root}>
      <div className={styles.listWrapper}>
        {data && data.length
          ? data.map((item, i) => <TipsItem key={i} title={item.title} content={item.content} />)
          : null}
      </div>
    </div>
  );
};

export default Tips;
