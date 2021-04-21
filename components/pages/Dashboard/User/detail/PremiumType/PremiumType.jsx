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

const PremiumType = ({ data, isMine, fetchData, premiumJobs }) => {
  const [isEditMode, setEditMode] = useState(false);

  const initFieldState = {
    premiumJobs:
      data?.detail?.premium_type_display.map((x) => ({
        value: x.id,
        label: x.name,
      })) ?? [],
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState({ premiumJobs: null });
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
        detail: { premium_type: fieldState.premiumJobs.map((x) => x.value) },
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
          console.log("post premium type", { res });
          setPosting(false);
          fetchData();
        })
        .catch((err) => {
          console.error("post premium type", { err });
        });
    }
  };

  return (
    <>
      <div className={profileStyles.type}>
        <div className={profileStyles.typeTitle}>
          <span>Accepted Job Types</span>
          {isMine ? <LocalEditButton onClick={onOpenEdit} /> : null}
        </div>
        {data.detail?.premium_type_display && data.detail.premium_type_display.length ? (
          <div className={profileStyles.typeList}>
            {data.detail.premium_type_display.map((premium_type, i) => (
              <div key={i}>
                <div className={profileStyles.typeItem}>{premium_type.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isEditMode}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Accepted Job Types</div>
          <div className={popupStyles.editForm}>
            <SelectBox
              label="Premium Type"
              placeholder="Select job type"
              value={fieldState.premiumJobs}
              options={premiumJobs}
              onChange={(val) => onChangeField("premiumJobs", val)}
              isMulti={true}
              defaultValue={initFieldState.premiumJobs}
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

export default PremiumType;
