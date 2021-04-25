import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextFieldLegacy";
import profileStyles from "../index.module.scss";
import styles from "./About.module.scss";
import popupStyles from "./Avatar.module.scss";
import LocalEditButton from "./LocalEditButton";

const About = ({ about, isEdit, role, userId }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(about);
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

  const onSave = async () => {
    const isAnyError = validateField(value);
    setErrValue(isAnyError);

    if (!isAnyError) {
      setPosting(true);
      try {
        await axios.patch(`/${role}s/${userId}/`, { detail: { about: value } });
        await mutate(`/auth/profile/${userId}/`);
        setPosting(false);
        onCloseEdit();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <div className={profileStyles.about}>
        <div className={profileStyles.aboutTitle}>
          <span>About</span>
          {isEdit ? <LocalEditButton onClick={onOpenEdit} /> : null}
        </div>
        {about ? (
          <div
            className={profileStyles.aboutContent}
            dangerouslySetInnerHTML={{ __html: about }}
          />
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
              defaultValue={about}
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
