import React, { useState } from "react";
import styles from "./Avatar.module.scss";
import profileStyles from "../Profile.module.scss";
import popupStyles from "../ProfilePopup.module.scss";
import IconCamera from "~components/svg/icon-camera.svg";
import clsx from "clsx";
import Popup from "~components/Popup/Popup";
import Button from "~components/Button/Button";
import axios from "axios";

// https://stackoverflow.com/questions/52566331/formdata-append-nested-object
//
function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

const Wrapper = ({ isMine, onChangePhoto, children }) =>
  isMine ? (
    <label className={clsx(profileStyles.avatar, "reset-button")}>
      <input
        className={clsx(styles.avatarInput, "hide-input")}
        type="file"
        name="upload-avatar"
        onChange={onChangePhoto}
      />
      {children}
    </label>
  ) : (
    <div className={profileStyles.avatar}>{children}</div>
  );

const Avatar = ({ data, isMine, fetchData }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isPosting, setPosting] = useState(false);
  const [newAvatar, setNewAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();

  const onAvatarSrcError = (e) => {
    e.target.src = "/img/default-avatar.png";
  };

  const onChangePhoto = (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    setPreviewAvatar(URL.createObjectURL(target.files[0]));
    setNewAvatar(target.files[0]);
    setOpenPopup(true);
  };

  const onEdit = () => {
    setOpenPopup(true);
  };

  const onClosePopup = () => {
    setOpenPopup(false);
  };

  const onSave = () => {
    if (isPosting) return false;

    setPosting(true);

    const formData = new FormData();
    formData.append("detail.avatar", newAvatar);

    // formData.append("detail", JSON.stringify({ avatar: newAvatar }));

    // const patchData = { detail: { avatar: newAvatar } };
    // buildFormData(formData, patchData);

    let _role;
    if (data.role === enumRoles.client) {
      _role = "clients";
    } else if (data.role === enumRoles.writer) {
      _role = "writers";
    }

    axios
      .patch(`/${_role}/${data.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //--prod console.log({ res });
        setOpenPopup(false);
        fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Wrapper isMine={isMine} onClick={onEdit} onChangePhoto={onChangePhoto}>
        {data.detail?.avatar ? (
          <img src={data.detail.avatar} alt="User avatar" onError={onAvatarSrcError} />
        ) : (
          <img src="/img/default-avatar.png" alt="User avatar" />
        )}
        {isMine ? (
          <div className={profileStyles.avatarIcon}>
            <IconCamera className={profileStyles.avatarSvg} />
          </div>
        ) : null}
      </Wrapper>
      <Popup classNameBox={clsx(popupStyles.editPopupBox, styles.popup)} isOpen={isOpenPopup}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Change Avatar</div>
          <div className={popupStyles.editForm}>
            {previewAvatar ? (
              <img className={styles.preview} src={previewAvatar} alt="User avatar" />
            ) : null}
          </div>
          <div className={popupStyles.editActions}>
            <div className={popupStyles.editActionsItem}>
              <Button
                className={popupStyles.editActionsBtn}
                label="Cancel"
                variant="secondary"
                onClick={onClosePopup}
              />
            </div>
            <div className={popupStyles.editActionsItem}>
              <Button
                className={popupStyles.editActionsBtn}
                label="Save"
                variant="primary"
                onClick={onSave}
                isLoading={isPosting}
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Avatar;
