import React, { useState } from "react";
import styles from "./WorkHistories.module.scss";
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

const WorkHistories = ({ data, isMine, fetchData }) => {
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
      .post(`/writers/${data.id}/work-histories/`, postData)
      .then((res) => {
        console.log("work history", { res });
        setPosting(false);
        fetchData();
      })
      .catch((err) => {
        console.error("work history", { err });
      });
  };

  const onSaveEdit = (patchData, id) => {
    axios
      .patch(`/writers/${data.id}/work-histories/${id}/`, patchData)
      .then((res) => {
        console.log("work history", { res });
        setPosting(false);
        fetchData();
      })
      .catch((err) => {
        console.error("work history", { err });
      });
  };

  return (
    <>
      <div className={profileStyles.workHistory}>
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
            <RenderAllHistory data={data.work_histories} isMine={isMine} onEdit={onEdit} />
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

export default WorkHistories;
