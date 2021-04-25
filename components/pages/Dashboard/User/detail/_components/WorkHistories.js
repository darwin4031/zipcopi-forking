import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button, { ButtonIcon } from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextFieldLegacy";
import IconAddVariant from "~components/svg/icon-add-variant.svg";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import profileStyles from "../index.module.scss";
import popupStyles from "./Avatar.module.scss";
import Display from "./Display";
import styles from "./WorkHistories.module.scss";

function RenderAllHistory({ data, isEdit, onEdit }) {
  return data && data.length
    ? data.map((work, i) => (
        <Display key={i} isEdit={isEdit} onEdit={() => onEdit(data[i])}>
          <Display.Header>
            <Display.Title>{work.title}</Display.Title>
            <Display.Type>{work.section}</Display.Type>
          </Display.Header>
          <Display.Description>{work.description}</Display.Description>
          <Display.Year>{work.year}</Display.Year>
        </Display>
      ))
    : null;
}

const WorkHistories = ({ work_histories, isEdit, userId }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState();

  const initFieldState = {
    title: "",
    description: "",
    year: "",
    section: "",
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
    setFieldState(data);
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
        title: fieldState.title,
        description: fieldState.description,
        year: fieldState.year,
        section: fieldState.section,
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
      await axios.post(`/writers/${userId}/work-histories/`, postData);
      await mutate(`/auth/profile/${userId}/`);
      setPosting(false);
      setOpenPopup(false);
    } catch (e) {
      console.error("work history", { e });
    }
  };

  const onSaveEdit = async (patchData, id) => {
    console.log(patchData);
    try {
      await axios.patch(`/writers/${userId}/work-histories/${id}/`, patchData);
      await mutate(`/auth/profile/${userId}/`);
      setPosting(false);
      setOpenPopup(false);
    } catch (e) {
      console.error("work history", { e });
    }
  };

  return (
    <>
      <div className={profileStyles.workHistory}>
        <div className={profileStyles.workHistoryTitle}>
          <span>Work History</span>
          {isEdit ? (
            <Button className={styles.addBtn} type="fab" onClick={onAdd}>
              <ButtonIcon className={styles.addBtnIcon} svg={IconAddVariant} />
            </Button>
          ) : null}
        </div>
        {work_histories && work_histories.length > 0 ? (
          <div className={profileStyles.workHistoryList}>
            <RenderAllHistory data={work_histories} isEdit={isEdit} onEdit={onEdit} />
          </div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isOpenPopup}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Work History</div>
          <div className={popupStyles.editForm}>
            <TextField
              className={styles.field}
              label="Job Title"
              placeholder="Insert job title"
              value={fieldState.title}
              stateKey="title"
              onChange={onChangeField}
              errors={errorState}
            />
            <TextField
              className={styles.field}
              label="Job Description"
              placeholder="Insert job description"
              value={fieldState.description}
              stateKey="description"
              onChange={onChangeField}
              errors={errorState}
            />
            <TextField
              className={styles.field}
              label="Year"
              placeholder="Insert job year"
              value={fieldState.year}
              stateKey="year"
              onChange={onChangeField}
              errors={errorState}
            />
            <TextField
              className={styles.field}
              label="Type"
              placeholder="Insert job type"
              value={fieldState.section}
              stateKey="section"
              onChange={onChangeField}
              errors={errorState}
            />
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

export default WorkHistories;
