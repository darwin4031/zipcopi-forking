import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextFieldLegacy";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import profileStyles from "../index.module.scss";
import popupStyles from "./Avatar.module.scss";
import LocalEditButton from "./LocalEditButton";

const Address = ({ address, isEdit, userId, role }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isPosting, setPosting] = useState(false);
  const [fieldState, setFieldState] = useState({ address });
  const [errorState, setErrorState] = useState({ address: null });

  const onOpenEdit = () => {
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

  const onSave = async () => {
    if (isPosting) return false;

    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField);

    setErrorState(newErrorState);

    if (!isError) {
      setPosting(true);
      try {
        await axios.patch(`/${role}s/${userId}/`, {
          detail: { address: fieldState.address },
        });
        await mutate(`/auth/profile/${userId}/`);
        setPosting(false);
        setOpenPopup(false);
      } catch (err) {
        console.error("address", { err });
      }
    }
  };

  return (
    <>
      <div className={profileStyles.sidebarAddress}>
        <div className={profileStyles.sidebarAddressTitle}>
          <span>Address</span>
          {isEdit ? <LocalEditButton onClick={onOpenEdit} /> : null}
        </div>
        {address ? (
          <div className={profileStyles.sidebarAddressContent}>{address}</div>
        ) : (
          <div className={profileStyles.empty}>No information</div>
        )}
      </div>
      <Popup classNameBox={popupStyles.editPopupBox} isOpen={isOpenPopup}>
        <div className={popupStyles.edit}>
          <div className={popupStyles.editTitle}>Address</div>
          <div className={popupStyles.editForm}>
            <TextField
              type="text"
              label="Address"
              placeholder="Your address ..."
              onChange={onChangeField}
              stateKey="address"
              errors={errorState}
              value={fieldState.address}
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

export default Address;
