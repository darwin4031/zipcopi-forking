import clsx from "clsx";
import styles from "./index.module.scss";

function AvatarCard({ image, className }) {
  return (
    <div className={styles.container}>
      <img className={clsx(styles.image, className)} src={image} />
    </div>
  );
}
export default AvatarCard;
