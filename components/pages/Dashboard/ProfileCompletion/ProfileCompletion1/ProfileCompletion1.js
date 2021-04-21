import axios from "axios";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import Button, { ButtonIcon, ButtonText } from "~components/elements/Button";
import IconCamera from "~components/svg/icon-camera.svg";
import IconEdit from "~components/svg/icon-edit.svg";
import TextField from "~components/TextField/TextField";
import { AuthContext } from "~context/AuthContext";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import ProfileCompletionAction from "../ProfileCompletionAction";
import ProfileCompletionTitle from "../ProfileCompletionTitle";
import styles from "./ProfileCompletion1.module.scss";

const ProfileCompletion1 = ({ onNextStep, userData }) => {
  const { auth } = useContext(AuthContext);

  const [isEditingProfile, setEditingProfile] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(userData?.detail?.avatar);
  const [selectedPhoto, setSelectedPhoto] = useState();

  const initFieldState = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    registeredAddress: userData?.detail?.address ?? "",
  };
  const [fieldState, setFieldState] = useState(initFieldState);

  //--prod console.log({ address: userData?.detail?.address });

  const [errorState, setErrorState] = useState({
    first_name: null,
    last_name: null,
    email: null,
    registeredAddress: null,
  });

  /**
   * Handle on input file change
   * @param {Event} e
   */
  const onChangePhoto = (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    setPreviewAvatar(URL.createObjectURL(target.files[0]));
    setSelectedPhoto(target.files[0]);
  };

  const onChangeField = (key, val) => {
    setErrorState({ ...errorState, [key]: validateField(key, val) });
    setFieldState({ ...fieldState, [key]: val });
  };

  const validateField = (key, val) => {
    let errorField = null;
    if (!val) errorField = "Please fill this field!";
    return errorField;
  };

  const postChangeAvatar = (file, userId) => {
    if (!file) return Promise.resolve();

    const formData = new FormData();
    formData.append("avatar", file);

    return axios
      .patch(`/writers/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //--prod console.log({ res });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onContinue = () => {
    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField);

    setErrorState(newErrorState);

    if (!isError) {
      setLoading(true);

      if (selectedPhoto) {
        // Update avatar if changed
        postChangeAvatar(selectedPhoto, auth.user_id).then(() => {
          setLoading(false);
          onNextStep({
            first_name: fieldState.first_name,
            last_name: fieldState.last_name,
            detail: {
              address: fieldState.registeredAddress,
            },
          });
        });
      } else {
        setLoading(false);
        onNextStep({
          first_name: fieldState.first_name,
          last_name: fieldState.last_name,
          detail: {
            address: fieldState.registeredAddress,
          },
        });
      }

      // setTimeout(() => {
      //   setLoading(false);
      //   onNextStep();
      // }, 2000);
    }
  };

  const onEnterEditingProfile = () => {
    setEditingProfile(true);
  };

  const onSaveprofile = () => {
    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField, {
      includeKey: ["first_name", "last_name"],
    });

    setErrorState({ ...errorState, ...newErrorState });

    if (!isError) setEditingProfile(false);
  };

  return (
    <div className={styles.first}>
      <ProfileCompletionTitle>Upload Profile picture</ProfileCompletionTitle>

      <div className={styles.avatar}>
        <label className={styles.avatarLabel}>
          <input
            className={clsx(styles.uploadInput, "hide-input")}
            type="file"
            name="upload-avatar"
            onChange={onChangePhoto}
          />

          <div className={styles.avatarImage}>
            {previewAvatar ? (
              <img className={styles.avatarPhoto} src={previewAvatar} />
            ) : (
              <img className={styles.avatarPhoto} src="/img/default-avatar.png" />
            )}
          </div>
          <div className={styles.avatarIcon}>
            <IconCamera className={styles.avatarSvg} />
          </div>
        </label>
        <div className={styles.avatarInfo}>
          {isEditingProfile ? (
            <>
              <TextField
                stateKey="first_name"
                type="text"
                label="First Name"
                placeholder="Insert your first name"
                onChange={onChangeField}
                errors={errorState}
                defaultValue={fieldState.first_name}
              />
              <TextField
                className={styles.textField}
                stateKey="last_name"
                type="text"
                label="Last Name"
                placeholder="Insert your last name"
                onChange={onChangeField}
                errors={errorState}
                defaultValue={fieldState.last_name}
              />
              <br />
            </>
          ) : (
            <h5
              className={styles.avatarName}
            >{`${fieldState.first_name} ${fieldState.last_name}`}</h5>
          )}

          <h6 className={styles.avatarEmail}>{fieldState.email}</h6>
        </div>

        <div className={styles.avatarAction}>
          {isEditingProfile ? (
            <Button variant="primary" onClick={onSaveprofile}>
              <ButtonText>Save</ButtonText>
            </Button>
          ) : (
            <Button className={styles.avatarEdit} type="fab" onClick={onEnterEditingProfile}>
              <ButtonIcon svg={IconEdit} />
            </Button>
          )}
        </div>
      </div>

      <ProfileCompletionTitle>Enter your registered address</ProfileCompletionTitle>
      <TextField
        className={styles.textField}
        stateKey="registeredAddress"
        type="text"
        label="Registered Address"
        placeholder="Insert your address"
        onChange={onChangeField}
        errors={errorState}
        defaultValue={initFieldState.registeredAddress}
      />

      <ProfileCompletionAction
        onContinue={onContinue}
        onCompleteLater={onNextStep}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCompletion1;
