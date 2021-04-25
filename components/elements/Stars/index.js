import clsx from "clsx";
import IconStar from "~components/svg/icon-star.svg";
import styles from "./index.module.scss";

const Stars = ({ rate }) => {
  let output = [];

  for (let i = 1; i <= 5; i++) {
    output.push(
      <div key={i}>
        <IconStar className={clsx(styles.starIcon, i <= rate && styles.isActive)} />
      </div>
    );
  }

  return <div className={styles.stars}>{output}</div>;
};

export default Stars;
