import EmptyJob from "~components/elements/EmptyJob";
import styles from "./EmptyJobWriter.module.scss";

const EmptyJobWriter = () => {
  return (
    <div className={styles.container}>
      <EmptyJob />
    </div>
  );
};

export default EmptyJobWriter;
