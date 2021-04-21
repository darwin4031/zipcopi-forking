import React, { useState } from "react";
import styles from "./Language.module.scss";
import popupStyles from "../ProfilePopup.module.scss";
import profileStyles from "../Profile.module.scss";
import Popup from "~components/Popup/Popup";
import fieldStateRevalidate from "@/utils/fieldStateRevalidate";
import LocalEditButton from "../LocalEditButton";
import TextField from "~components/TextField/TextField";
import Button, { ButtonIcon } from "~components/Button/Button";
import axios from "axios";
import enumRoles from "~components/enumRoles";
import ProfileWorkHistory from "../ProfileWorkHistory";
import IconAddVariant from "~components/svg/icon-add-variant.svg";
import IconEdit from "~components/svg/icon-edit.svg";
import ProfileCompletionTitle from "~components/ProfileCompletion/ProfileCompletionTitle";
import Radio from "~components/Radio/Radio";
import ErrorMessage from "~components/ErrorMessage/ErrorMessage";

const radioMapper = {
  Basic: { value: 1, label: "Basic" },
  Fluent: { value: 2, label: "Fluent" },
  Conversational: { value: 3, label: "Conversational" },
  "Native or Bilingual": { value: 4, label: "Native or Bilingual" },
};

const RenderLanguages = ({ languages, isMine, onEdit }) => {
  return languages && languages.length
    ? languages.map((language, i) => (
        <div key={i} className={profileStyles.language}>
          <div className={profileStyles.languageBody}>
            <div className={profileStyles.languageName}>{language.languages}:</div>
            <div className={profileStyles.languageLevel}>{language.proficiency}</div>
          </div>
          {isMine ? (
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

const Language = ({ data, isMine, fetchData }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState();

  const initFieldState = {
    languages: "",
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
      languages: data.languages,
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
        languages: fieldState.languages,
        proficiency: fieldState.proficiency?.label,
      };

      let _role;
      if (data.role === enumRoles.client) {
        _role = "clients";
      } else if (data.role === enumRoles.writer) {
        _role = "writers";
      }

      if (isAdding) {
        onSaveAdd(httpData);
      } else {
        onSaveEdit(httpData, currentEditingId);
      }
    }
  };

  const onSaveAdd = (postData) => {
    axios
      .post(`/writers/${data.id}/languages/`, postData)
      .then((res) => {
        console.log("language", { res });
        setPosting(false);
        fetchData();
      })
      .catch((err) => {
        console.error("language", { err });
      });
  };

  const onSaveEdit = (patchData, id) => {
    axios
      .patch(`/writers/${data.id}/languages/${id}/`, patchData)
      .then((res) => {
        console.log("language", { res });
        setPosting(false);
        fetchData();
      })
      .catch((err) => {
        console.error("language", { err });
      });
  };

  return (
    <>
      <div className={profileStyles.sidebarLanguages}>
        <div className={profileStyles.sidebarLanguagesTitle}>
          <span>Language</span>
          {isMine ? (
            <Button className={styles.addBtn} type="fab" onClick={onAdd}>
              <ButtonIcon className={styles.addBtnIcon} svg={IconAddVariant} />
            </Button>
          ) : null}
        </div>
        <RenderLanguages languages={data.languages} isMine={isMine} onEdit={onEdit} />
      </div>

      {/* <div className={profileStyles.workHistory}>
        <div className={profileStyles.workHistoryTitle}>
          <span>Work History</span>
          {isMine ? (
            <Button className={styles.addBtn} type="fab" onClick={onAdd}>
              <ButtonIcon className={styles.addBtnIcon} svg={IconAddVariant} />
            </Button>
          ) : null}
        </div>
        {data.work_histories && data.work_histories.length > 0 ? (
          <div className={profileStyles.workHistoryList}>
            <RenderAllHistory
              data={data.work_histories}
              isMine={isMine}
              onEdit={onEdit}
            />
          </div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div> */}

      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isOpenPopup}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Language</div>
          <div className={popupStyles.editForm}>
            <TextField
              className={styles.field}
              label="Language"
              placeholder="Insert language ..."
              value={fieldState.languages}
              stateKey="languages"
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

function RenderAllHistory({ data, isMine, onEdit }) {
  return data && data.length
    ? data.map((work, i) => (
        <ProfileWorkHistory key={i} isMine={isMine} onEdit={() => onEdit(data[i])}>
          <ProfileWorkHistory.Header>
            <ProfileWorkHistory.Title>{work.title}</ProfileWorkHistory.Title>
            <ProfileWorkHistory.Type>{work.section}</ProfileWorkHistory.Type>
          </ProfileWorkHistory.Header>
          <ProfileWorkHistory.Description>{work.description}</ProfileWorkHistory.Description>
          <ProfileWorkHistory.Year>{work.year}</ProfileWorkHistory.Year>
        </ProfileWorkHistory>
      ))
    : null;
}

export default Language;
