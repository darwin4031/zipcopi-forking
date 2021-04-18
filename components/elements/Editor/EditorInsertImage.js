import axios from "axios";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import Button, { ButtonIcon } from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextField";
import IconEditorImage from "~components/svg/icon-editor-image.svg";
import blobToBase64 from "~utils/blobToBase64";
import styles from "./EditorInsertImage.module.scss";

const EditorInsertImage = ({ isActive, onInsertImage }) => {
  const inputRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [isFetchingImage, setFetchingImage] = useState(false);
  const [isOpenPopup, setOpenPopup] = useState(false);

  const onClickBtn = () => {
    setOpenPopup(true);
  };

  const onAddImageFromUrl = (url) => {
    if (isFetchingImage) return false;
    if (!isFetchingImage) setFetchingImage(true);

    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        blobToBase64(res.data).then((base64Img) => {
          onInsertImage(base64Img);
          setFetchingImage(false);
          setOpenPopup(false);
          setImageUrl("");
        });
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  /**
   * @param {File[]} files
   */
  const onAddImageFromFile = (files) => {
    const commonImage = /\.(jpe?g|png|gif)$/i;
    const file = files[0];

    if (commonImage.test(file.name)) {
      blobToBase64(file).then((base64Img) => {
        onInsertImage(base64Img);
        setOpenPopup(false);
      });
    } else {
      console.error("forbidden file");
    }
  };

  const openFileSelector = () => {
    inputRef.current.click();
  };

  return (
    <>
      <Button
        className={clsx(styles.insert__button, { [styles.isActive]: isActive })}
        type="fab"
        onClick={onClickBtn}
      >
        <ButtonIcon svg={IconEditorImage} />
      </Button>
      <Popup isOpen={isOpenPopup} classNameBox={styles.insert__popupBox}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => onAddImageFromFile(e.target.files)}
          className={styles.insert__inputFile}
        />
        <Button label="Upload image" variant="secondary" onClick={openFileSelector} />
        <div className={styles.insert__or}>Or</div>
        <div className={styles.insert__flex}>
          <TextField
            inputClassName={styles.insert__urlInput}
            placeholder="Insert url ..."
            value={imageUrl}
            onNativeChange={(e) => setImageUrl(e.target.value)}
          />
          <Button
            className={styles.insert__urlBtn}
            label="Insert"
            variant="primary"
            isLoading={isFetchingImage}
            onClick={() => onAddImageFromUrl(imageUrl)}
          />
        </div>
      </Popup>
    </>
  );
};

export default EditorInsertImage;
