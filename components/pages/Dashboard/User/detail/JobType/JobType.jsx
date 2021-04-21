import React, { useState } from "react";
import popupStyles from "../ProfilePopup.module.scss";
import profileStyles from "../Profile.module.scss";
import LocalEditButton from "../LocalEditButton";
import Popup from "~components/Popup/Popup";
import Button from "~components/Button/Button";
import SelectBox from "~components/SelectBox/SelectBox";
import fieldStateRevalidate from "@/utils/fieldStateRevalidate";
import axios from "axios";
import enumRoles from "~components/enumRoles";

const JobType = ({ data, isMine, fetchData, jobTypes }) => {
  const [isEditMode, setEditMode] = useState(false);

  const initFieldState = {
    jobTypes:
      data?.detail?.job_type_display.map((x) => ({
        value: x.id,
        label: x.name,
      })) ?? [],
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState({ jobTypes: null });
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
        detail: { job_type: fieldState.jobTypes.map((x) => x.value) },
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
          console.log("post job type", { res });
          setPosting(false);
          fetchData();
        })
        .catch((err) => {
          console.error("post job type", { err });
        });
    }
  };

  return (
    <>
      <div className={profileStyles.writing}>
        <div className={profileStyles.writingTitle}>
          <span>Writing Types</span>
          {isMine ? <LocalEditButton onClick={onOpenEdit} /> : null}
        </div>
        {data.detail?.job_type_display && data.detail.job_type_display.length ? (
          <div className={profileStyles.writingList}>
            {data.detail.job_type_display.map((job_type, i) => (
              <div key={i}>
                <div className={profileStyles.writingItem}>{job_type.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isEditMode}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Writing Types</div>
          <div className={popupStyles.editForm}>
            <SelectBox
              label="Writing Type"
              placeholder="Select writing type"
              value={fieldState.jobTypes}
              options={jobTypes}
              onChange={(val) => onChangeField("jobTypes", val)}
              isMulti={true}
              defaultValue={initFieldState.jobTypes}
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

export default JobType;
