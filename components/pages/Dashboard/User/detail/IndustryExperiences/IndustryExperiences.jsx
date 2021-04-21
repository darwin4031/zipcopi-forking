import React, { useState } from "react";
import popupStyles from "../ProfilePopup.module.scss";
import profileStyles from "../Profile.module.scss";
import Popup from "~components/Popup/Popup";
import fieldStateRevalidate from "@/utils/fieldStateRevalidate";
import LocalEditButton from "../LocalEditButton";
import TextField from "~components/TextField/TextField";
import Button from "~components/Button/Button";
import axios from "axios";
import enumRoles from "~components/enumRoles";
import styles from "./IndustryExperiences.module.scss";

const IndustryExperiences = ({ data, isMine, fetchData }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);

  const initFieldState = {
    industries: data?.detail?.industry_experiences ?? [""],
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState({
    industries: data?.detail?.industry_experiences.map(() => null) ?? [null],
  });
  const [isPosting, setPosting] = useState(false);

  const onEdit = () => {
    setOpenPopup(true);
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
    if (isPosting) return false;

    let isIndustryError = false;
    const industryError = fieldState.industries.map((x, i) => {
      const isErr = validateField("industry", x);
      if (isErr) isIndustryError = true;
      return isErr;
    });

    setErrorState({ industries: industryError });

    if (!isIndustryError) {
      setPosting(true);

      const patchData = {
        detail: { industry_experiences: fieldState.industries },
      };

      let _role;
      if (data.role === enumRoles.client) {
        _role = "clients";
      } else if (data.role === enumRoles.writer) {
        _role = "writers";
      }

      axios
        .patch(`/writers/${data.id}/`, patchData)
        .then((res) => {
          console.log("work history", { res });
          setPosting(false);
          fetchData();
        })
        .catch((err) => {
          console.error("work history", { err });
        });
    }
  };

  const onChangeIndustry = (i, val) => {
    const newIndustry = [...fieldState.industries];
    const newIndustryError = [...errorState.industries];
    newIndustry[i] = val;
    newIndustryError[i] = validateField("industry", val);
    setErrorState({ ...errorState, industries: newIndustryError });
    setFieldState({ ...fieldState, industries: newIndustry });
  };

  const onRemoveIndustry = (index) => {
    const newVal = fieldState.industries.filter((x, i) => i !== index);
    const newErr = errorState.industries.filter((x, i) => i !== index);
    setFieldState({ ...fieldState, industries: newVal });
    setErrorState({ ...errorState, industries: newErr });
  };

  const onAddIndustry = () => {
    setFieldState({
      ...fieldState,
      industries: [...fieldState.industries, ""],
    });
    setErrorState({
      ...errorState,
      industries: [...errorState.industries, null],
    });
  };

  return (
    <>
      <div className={profileStyles.experiences}>
        <div className={profileStyles.experiencesTitle}>
          <span>Industry Experiences</span>
          {isMine ? <LocalEditButton onClick={onEdit} /> : null}
        </div>
        {data.detail?.industry_experiences && data.detail.industry_experiences.length ? (
          <div className={profileStyles.experiencesList}>
            {data.detail.industry_experiences.map((item, i) => (
              <div key={i}>
                <div className={profileStyles.experiencesItem}>{item}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isOpenPopup}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Industry Experiences</div>
          <div className={popupStyles.editForm}>
            <div className={styles.industries}>
              {fieldState.industries.map((industry, i) => (
                <div className={styles.industry} key={i}>
                  <TextField
                    type="text"
                    placeholder="Industry name ..."
                    onChange={(key, val) => onChangeIndustry(i, val)}
                    stateKey="industry"
                    errors={{ industry: errorState.industries[i] }}
                    value={industry}
                  />
                  {fieldState.industries.length > 1 ? (
                    <Button
                      className={styles.industry__remove}
                      label="Remove"
                      onClick={() => onRemoveIndustry(i)}
                    />
                  ) : null}
                </div>
              ))}

              <Button className={styles.industries__add} label="Add new" onClick={onAddIndustry} />
            </div>
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

export default IndustryExperiences;
