import axios from "axios";
import React, { useState } from "react";
import { mutate } from "swr";
import Button, { ButtonIcon } from "~components/elements/Button";
import ErrorMessage from "~components/elements/ErrorMessage";
import Popup from "~components/elements/Popup";
import Radio from "~components/elements/Radio";
import TextField from "~components/elements/TextFieldLegacy";
import IconAddVariant from "~components/svg/icon-add-variant.svg";
import IconEdit from "~components/svg/icon-edit.svg";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import ProfileCompletionTitle from "../../../ProfileCompletion/ProfileCompletionTitle";
import profileStyles from "../index.module.scss";
import popupStyles from "./Avatar.module.scss";
import styles from "./Language.module.scss";

const radioMapper = {
  Basic: { value: 1, label: "Basic" },
  Fluent: { value: 2, label: "Fluent" },
  Conversational: { value: 3, label: "Conversational" },
  "Native or Bilingual": { value: 4, label: "Native or Bilingual" },
};

const RenderLanguages = ({ languages, isEdit, onEdit }) => {
  return languages && languages.length
    ? languages.map((language, i) => (
        <div key={i} className={profileStyles.language}>
          <div className={profileStyles.languageBody}>
            <div className={profileStyles.languageName}>{language.language}:</div>
            <div className={profileStyles.languageLevel}>{language.proficiency}</div>
          </div>
          {isEdit ? (
            <div className={profileStyles.languageAction}>
              <Button
                className={profileStyles.languageEdit}
                type="fab"
                onClick={() => onEdit(language)}
              >
                <ButtonIcon className={profileStyles.languageEditIcon} svg={IconEdit} />
              </Button>
            </div>
          ) : null}
        </div>
      ))
    : null;
};

const Language = ({ languages, isEdit, userId }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState();

  const initFieldState = {
    language: "",
    proficiency: null,
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState({ premiumJobs: null });
  const [isPosting, setPosting] = useState(false);

  const onAdd = () => {
    setOpenPopup(true);
    setAdding(true);
    setCurrentEditingId(null);
    setFieldState(initFieldState);
  };

  const onEdit = (data) => {
    setOpenPopup(true);
    setAdding(false);
    setCurrentEditingId(data.id);
    setFieldState({
      language: data.language,
      proficiency: radioMapper[data.proficiency],
    });
  };

  const onClosePopup = () => {
    setOpenPopup(false);
  };

  const validateField = (key, val) => {
    let errorField = null;
    if (!val) errorField = "Please fill this field!";
    return errorField;
  };

  const onChangeField = (key, val) => {
    setErrorState({ ...errorState, [key]: validateField(key, val) });
    setFieldState({ ...fieldState, [key]: val });
  };

  const onSave = () => {
    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField);

    setErrorState(newErrorState);

    if (!isError) {
      setPosting(true);

      const httpData = {
        language: fieldState.language,
        proficiency: fieldState.proficiency?.label,
      };

      if (isAdding) {
        onSaveAdd(httpData);
      } else {
        onSaveEdit(httpData, currentEditingId);
      }
    }
  };

  const onSaveAdd = async (postData) => {
    try {
      await axios.post(`/writers/${userId}/languages/`, postData);
      await mutate(`/auth/profile/${userId}/`);
      setPosting(false);
      setOpenPopup(false);
    } catch (err) {
      console.error("language", { err });
    }
  };

  const onSaveEdit = async (patchData, id) => {
    try {
      await axios.patch(`/writers/${userId}/languages/${id}/`, patchData);
      await mutate(`/auth/profile/${userId}/`);
      setPosting(false);
      setOpenPopup(false);
    } catch (err) {
      console.error("language", { err });
    }
  };

  return (
    <>
      <div className={profileStyles.sidebarLanguages}>
        <div className={profileStyles.sidebarLanguagesTitle}>
          <span>Language</span>
          {isEdit ? (
            <Button className={styles.addBtn} type="fab" onClick={onAdd}>
              <ButtonIcon className={styles.addBtnIcon} svg={IconAddVariant} />
            </Button>
          ) : null}
        </div>
        <RenderLanguages languages={languages} isEdit={isEdit} onEdit={onEdit} />
      </div>

      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isOpenPopup}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Language</div>
          <div className={popupStyles.editForm}>
            <TextField
              className={styles.field}
              label="Language"
              placeholder="Insert language ..."
              value={fieldState.language}
              stateKey="language"
              onChange={onChangeField}
              errors={errorState}
            />
            <ProfileCompletionTitle>Select proficiency</ProfileCompletionTitle>
            <Radio
              name="proficiency"
              onChange={(val) => onChangeField("proficiency", val)}
              value={fieldState.proficiency}
              className={styles.radioFlex}
              labelClassName={styles.radioCol}
              options={[
                { value: 1, label: "Basic" },
                { value: 2, label: "Fluent" },
                { value: 3, label: "Conversational" },
                { value: 4, label: "Native or Bilingual" },
              ]}
            />
            {errorState.proficiency ? <ErrorMessage>{errorState.proficiency}</ErrorMessage> : null}
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

export default Language;
