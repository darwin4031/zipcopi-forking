import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import IconCamera from "~components/svg/icon-camera.svg";
import useObjectState from "~hooks/useObjectState";
import useOpen from "~hooks/useOpen";
import profileStyles from "../index.module.scss";
import styles from "./Avatar.module.scss";

const Wrapper = ({ isEdit, onChangeAvatar, children }) =>
  isEdit ? (
    <label className={clsx(profileStyles.avatar, "reset-button")}>
      <input
        className={clsx(styles.avatarInput, "hide-input")}
        type="file"
        name="upload-avatar"
        onChange={onChangeAvatar}
      />
      {children}
      <div className={profileStyles.avatarIcon}>
        <IconCamera className={profileStyles.avatarSvg} />
      </div>
    </label>
  ) : (
    <div className={profileStyles.avatar}>{children}</div>
  );

const Avatar = ({ userId, oldAvatar, isEdit, role }) => {
  const [tempAvatar, setTempAvatar] = useObjectState({
    preview: oldAvatar,
    file: undefined,
  });
  const { isOpen, onOpen, onClose } = useOpen(false);
  const [loading, setLoading] = useState(false);
  const avatar = tempAvatar.preview ? tempAvatar.preview : "/img/default-avatar.png";

  const onChangeAvatar = (e) => {
    const target = e.target;
    setTempAvatar({ preview: URL.createObjectURL(target.files[0]), file: target.files[0] });
    onOpen();
  };

  const onSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("detail.avatar", tempAvatar.file);
    setLoading(false);
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      await axios.patch(`/${role}s/${userId}/`, formData, headers);
      await mutate(`/auth/profile/${userId}/`);
    } catch (e) {
      console.error(e);
    }
    onClose();
    setLoading(false);
  };

  return (
    <>
      <Wrapper isEdit={isEdit} onChangeAvatar={onChangeAvatar}>
        <img src={avatar} alt="User avatar" />
      </Wrapper>
      <Popup classNameBox={clsx(styles.editPopupBox, styles.popup)} isOpen={isOpen}>
        <div className={styles.edit}>
          <div className={styles.editTitle}>Change Avatar</div>
          <div className={styles.editForm}>
            <img className={styles.preview} src={avatar} alt="User avatar" />
          </div>
          <div className={styles.editActions}>
            <div className={styles.editActionsItem}>
              <Button
                className={styles.editActionsBtn}
                label="Cancel"
                variant="secondary"
                onClick={onClose}
              />
            </div>
            <div className={styles.editActionsItem}>
              <Button
                className={styles.editActionsBtn}
                label="Save"
                variant="primary"
                onClick={onSave}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Avatar;
