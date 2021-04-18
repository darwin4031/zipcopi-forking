import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import Button, { ButtonIcon, ButtonText } from "~components/elements/Button";
import IconAddCirle from "~components/svg/icon-add-circle.svg";
import IconClose from "~components/svg/icon-close.svg";
import IconFiletypeDoc from "~components/svg/icon-filetype-doc.svg";
import IconFiletypeFile from "~components/svg/icon-filetype-file.svg";

import IconFiletypeImage from "~components/svg/icon-filetype-image.svg";
import IconFiletypePdf from "~components/svg/icon-filetype-pdf.svg";
import IconFiletypeSpredsheet from "~components/svg/icon-filetype-spreadsheet.svg";
import styles from "./UploadFile.module.scss";

// MIME Type as a key
// see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const iconFiletype = {
  // Image
  gif: IconFiletypeImage,
  png: IconFiletypeImage,
  jpg: IconFiletypeImage,
  jpeg: IconFiletypeImage,
  svg: IconFiletypeImage,

  // Word
  doc: IconFiletypeDoc, // doc
  docx: IconFiletypeDoc, // docx

  // Excel / Spreadsheet
  xls: IconFiletypeSpredsheet, // xls
  xlsx: IconFiletypeSpredsheet, // xlsx

  // PDF
  pdf: IconFiletypePdf,

  // Other format
  file: IconFiletypeFile,
};

function getExtension(filename) {
  const parts = filename?.split(".");
  if (!parts) return null;
  return parts[parts.length - 1];
}

const Item = ({ value, idx, previewInnerClassName, previewClassName, file, onChange }) => {
  const router = useRouter();
  const fileName = file?.name || file.file.split("/").pop();
  const IconType = iconFiletype[getExtension(fileName)] ?? iconFiletype.file;
  const [isDeleting, setDeleting] = useState(false);

  const deleteFromBackend = (fileId, callback) => {
    const jobId = router.query.id;
    axios
      .delete(`/jobs/${jobId}/files/${fileId}/`)
      .then(() => callback())
      .catch((err) => {
        console.error("removing file", { err });
      });
  };

  return (
    <div className={previewInnerClassName}>
      <div className={clsx(styles.preview, previewClassName)}>
        <Button
          className={styles.previewCloseBtn}
          type="fab"
          isLoading={isDeleting}
          onClick={() => {
            const newValue = [...value];
            newValue.splice(idx, 1);
            if (file?.id) {
              setDeleting(true);
              deleteFromBackend(file?.id, () => {
                setDeleting(false);
                onChange(newValue);
              });
            } else {
              onChange(newValue);
            }
          }}
        >
          <ButtonIcon svg={IconClose} />
        </Button>
        <div className={styles.previewIcon}>
          <IconType />
        </div>
        <div className={styles.previewName}>{fileName}</div>
      </div>
    </div>
  );
};

/**
 * UploadFile
 * @param {Object} props
 * @param {File[]} props.value
 * @param {String} props.label
 * @param {String} props.labelClassName
 * @param {String} props.className
 * @param {String} props.previewWrapperClassName
 * @param {String} props.previewInnerClassName
 * @param {String} props.previewClassName
 * @param {String} props.name
 * @param {Boolean} props.multiple
 * @param {(val: File[]) => {}} props.onChange
 */
const UploadFile = ({
  value = [],
  label,
  className,
  labelClassName,
  previewWrapperClassName,
  previewInnerClassName,
  previewClassName,
  name,
  multiple,
  onChange = (val) => {},
}) => {
  return (
    <div className={className}>
      {value.length > 0 ? (
        <div className={clsx(styles.previewWrapper, previewWrapperClassName)}>
          {value.map((file, i) => (
            <Item
              key={i}
              idx={i}
              file={file}
              value={value}
              previewInnerClassName={previewInnerClassName}
              previewClassName={previewClassName}
              onChange={onChange}
            />
          ))}
        </div>
      ) : null}

      {multiple || !value || !value.length ? (
        <label className={labelClassName}>
          <input
            className={clsx("hide-input", styles.input)}
            type="file"
            name={name ? name : multiple ? "upload-files[]" : "upload-file"}
            id="upload-cv"
            multiple={multiple ? "multiple" : null}
            onChange={(e) => {
              // Prevent non iterable value (eg. null or undefined)
              const val = value || [];

              onChange([...val, ...e.target.files]);
            }}
          />
          <div className={styles.upload}>
            <ButtonIcon svg={IconAddCirle} />
            <ButtonText>{label}</ButtonText>
          </div>
        </label>
      ) : null}
    </div>
  );
};

export default UploadFile;
