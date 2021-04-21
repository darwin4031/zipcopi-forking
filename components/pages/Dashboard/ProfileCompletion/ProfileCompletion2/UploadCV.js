import Button, { ButtonIcon, ButtonText } from "~components/elements/Button";
import IconAddCirle from "~components/svg/icon-add-circle.svg";
import IconClose from "~components/svg/icon-close.svg";
import IconPDF from "~components/svg/icon-pdf.svg";
import styles from "./UploadCV.module.scss";

const UploadCV = ({ value, onChange = (val) => {} }) => {
  return value ? (
    <div className={styles.preview}>
      <Button className={styles.previewCloseBtn} type="fab" onClick={() => onChange(null)}>
        <ButtonIcon svg={IconClose} />
      </Button>
      <div className={styles.previewIcon}>
        <IconPDF />
      </div>
      <div className={styles.previewName}>{value.name}</div>
    </div>
  ) : (
    <label>
      <input
        className="hide-input"
        type="file"
        name="upload-cv"
        id="upload-cv"
        onChange={(e) => onChange(e.target.files[0])}
      />
      <div className={styles.upload}>
        <ButtonIcon svg={IconAddCirle} />
        <ButtonText>Upload CV</ButtonText>
      </div>
    </label>
  );
};

export default UploadCV;
