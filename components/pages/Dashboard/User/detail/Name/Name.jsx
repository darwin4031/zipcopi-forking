import React, { useState } from "react";
import popupStyles from "../ProfilePopup.module.scss";
import profileStyles from "../Profile.module.scss";
import LocalEditButton from "../LocalEditButton";
import Popup from "~components/Popup/Popup";
import Button from "~components/Button/Button";
import fieldStateRevalidate from "@/utils/fieldStateRevalidate";
import axios from "axios";
import enumRoles from "~components/enumRoles";
import TextField from "~components/TextField/TextField";

const Name = ({ data, isMine, fetchData, jobTypes }) => {
  const [isEditMode, setEditMode] = useState(false);

  const initFieldState = {
    first_name: data?.first_name,
    last_name: data?.last_name,
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState({
    first_name: null,
    last_name: null,
  });
  const [isPosting, setPosting] = useState(false);

  const onOpenEdit = () => {
    setEditMode(true);
  };

  const onCloseEdit = () => {
    setEditMode(false);
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

      const patchData = {
        first_name: fieldState.first_name,
        last_name: fieldState.last_name,
      };

      let _role;
      if (data.role === enumRoles.client) {
        _role = "clients";
      } else if (data.role === enumRoles.writer) {
        _role = "writers";
      }

      axios
        .patch(`/${_role}/${data.id}/`, patchData)
        .then((res) => {
          console.log("post name", { res });
          setPosting(false);
          fetchData();
        })
        .catch((err) => {
          console.error("post name", { err });
        });
    }
  };

  return (
    <>
      <div className={profileStyles.username}>
        <span>{`${data.first_name} ${data.last_name}`}</span>
        {isMine ? <LocalEditButton onClick={onOpenEdit} /> : null}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isEditMode}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Your Name</div>
          <div className={popupStyles.editForm}>
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
              style={{ marginTop: "14px" }}
              stateKey="last_name"
              type="text"
              label="Last Name"
              placeholder="Insert your last name"
              onChange={onChangeField}
              errors={errorState}
              defaultValue={fieldState.last_name}
            />
          </div>
          <div className={popupStyles.editActions}>
            <div className={popupStyles.editActionsItem}>
              <Button
                className={popupStyles.editActionsBtn}
                label="Cancel"
                variant="secondary"
                onClick={onCloseEdit}
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

export default Name;
