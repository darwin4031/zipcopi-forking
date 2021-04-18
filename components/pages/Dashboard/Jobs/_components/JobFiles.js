import styles from "./JobFiles.module.scss";

const fileName = (file) => file.file.split("/").pop();

const JobFiles = ({ files }) => {
  return (
    <div className={styles.filesWrapper}>
      {files.map((file) => (
        <a href={file.file} target="_blank" className={styles.filesItem} key={file.id}>
          {fileName(file)}
        </a>
      ))}
    </div>
  );
};

export default JobFiles;
