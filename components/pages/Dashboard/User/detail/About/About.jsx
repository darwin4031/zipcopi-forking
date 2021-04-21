import React, { useState } from "react";
import styles from "./About.module.scss";
import popupStyles from "../ProfilePopup.module.scss";
import profileStyles from "../Profile.module.scss";
import LocalEditButton from "../LocalEditButton";
import Popup from "~components/Popup/Popup";
import Button from "~components/Button/Button";
import TextField from "~components/TextField/TextField";
import axios from "axios";
import enumRoles from "~components/enumRoles";

const About = ({ data, isMine, fetchData }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(data?.detail?.about);
  const [errValue, setErrValue] = useState(null);
  const [isPosting, setPosting] = useState(false);

  const onOpenEdit = () => {
    setEditMode(true);
  };

  const onCloseEdit = () => {
    setEditMode(false);
  };

  const validateField = (val) => {
    if (!val) return "Please fill this field!";
    return null;
  };

  const onChange = (val) => {
    setErrValue(validateField(val));
    setValue(val);
  };

  const onSave = () => {
    const isAnyError = validateField(value);
    setErrValue(isAnyError);

    if (!isAnyError) {
      let _role;
      if (data.role === enumRoles.client) {
        _role = "clients";
      } else if (data.role === enumRoles.writer) {
        _role = "writers";
      }

      setPosting(true);
      axios
        .patch(`/${_role}/${data.id}/`, { detail: { about: value } })
        .then((res) => {
          console.log("post about", { res });
          setPosting(false);
          fetchData();
        })
        .catch((err) => {
          console.error("post about", { err });
        });
    }
  };

  return (
    <>
      <div className={profileStyles.about}>
        <div className={profileStyles.aboutTitle}>
          <span>About</span>
          {isMine ? <LocalEditButton onClick={onOpenEdit} /> : null}
        </div>
        {data.detail?.about ? (
          <div
            className={profileStyles.aboutContent}
            dangerouslySetInnerHTML={{ __html: data.detail.about }}
          ></div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isEditMode}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>About</div>
          <div className={popupStyles.editForm}>
            <TextField
              textareaClassName={styles.aboutTextField}
              label="About"
              placeholder="Short explanation about you ..."
              multiline={true}
              defaultValue={data?.detail?.about}
              stateKey="about"
              onChange={(key, val) => onChange(val)}
              errors={{ about: errValue }}
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

export default About;
