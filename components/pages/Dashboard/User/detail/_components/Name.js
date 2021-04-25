import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextFieldLegacy";
import useObjectState from "~hooks/useObjectState";
import useOpen from "~hooks/useOpen";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import profileStyles from "../index.module.scss";
import popupStyles from "./Avatar.module.scss";
import LocalEditButton from "./LocalEditButton";

const Name = ({ first_name, last_name, isEdit, role, userId }) => {
  const { isOpen, onOpen, onClose } = useOpen(false);
  const [loading, setLoading] = useState(false);
  const [fieldState, setFieldState] = useObjectState({ first_name, last_name });
  const [errorState, setErrorState] = useObjectState({
    first_name: null,
    last_name: null,
  });

  const validateField = (key, val) => {
    let errorField = null;
    if (!val) errorField = "Please fill this field!";
    return errorField;
  };

  const onChangeField = (key, val) => {
    setErrorState({ ...errorState, [key]: validateField(key, val) });
    setFieldState({ ...fieldState, [key]: val });
  };

  const onSave = async () => {
    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField);
    setErrorState(newErrorState);
    if (!isError) {
      setLoading(true);
      const patchData = {
        first_name: fieldState.first_name,
        last_name: fieldState.last_name,
      };
      try {
        await axios.patch(`/${role}s/${userId}/`, patchData);
        await mutate(`/auth/profile/${userId}/`);
      } catch (e) {
        console.error("post name", { err });
      }
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <div className={profileStyles.username}>
        <span>{`${first_name} ${last_name}`}</span>
        {isEdit ? <LocalEditButton onClick={onOpen} /> : null}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isOpen}>
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
                onClick={onClose}
              />
            </div>
            <div className={popupStyles.editActionsItem}>
              <Button
                className={popupStyles.editActionsBtn}
                label="Save"
                variant="primary"
                onClick={onSave}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Name;
