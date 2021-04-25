import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextFieldLegacy";
import profileStyles from "../index.module.scss";
import popupStyles from "./Avatar.module.scss";
import styles from "./IndustryExperiences.module.scss";
import LocalEditButton from "./LocalEditButton";

const IndustryExperiences = ({ industry_experiences = [], isEdit, role, userId }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);

  const initFieldState = {
    industries: industry_experiences ?? [""],
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState({
    industries: industry_experiences.map(() => null) ?? [null],
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

  const onSave = async () => {
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
      try {
        await axios.patch(`/writers/${userId}/`, patchData);
        await mutate(`/auth/profile/${userId}/`);
        setPosting(false);
        setOpenPopup(false);
      } catch (e) {
        console.error("work history", { err });
      }
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
          {isEdit ? <LocalEditButton onClick={onEdit} /> : null}
        </div>
        {industry_experiences && industry_experiences.length ? (
          <div className={profileStyles.experiencesList}>
            {industry_experiences.map((item, i) => (
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
