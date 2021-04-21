import React, { useState } from "react";
import styles from "./Address.module.scss";
import profileStyles from "../Profile.module.scss";
import popupStyles from "../ProfilePopup.module.scss";
import Button from "~components/Button/Button";
import Popup from "~components/Popup/Popup";
import LocalEditButton from "../LocalEditButton/LocalEditButton";
import TextField from "~components/TextField/TextField";
import fieldStateRevalidate from "@/utils/fieldStateRevalidate";
import enumRoles from "~components/enumRoles";
import axios from "axios";

const Address = ({ data, isMine, fetchData }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isPosting, setPosting] = useState(false);
  const [fieldState, setFieldState] = useState({
    address: data?.detail?.address,
  });
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

  const onSave = () => {
    if (isPosting) return false;

    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField);

    setErrorState(newErrorState);

    if (!isError) {
      setPosting(true);

      let _role;
      if (data.role === enumRoles.client) {
        _role = "clients";
      } else if (data.role === enumRoles.writer) {
        _role = "writers";
      }

      axios
        .patch(`/${_role}/${data.id}/`, {
          detail: { address: fieldState.address },
        })
        .then((res) => {
          console.log("address", { res });
          setPosting(false);
          fetchData();
        })
        .catch((err) => {
          console.error("address", { err });
        });
    }
  };

  return (
    <>
      <div className={profileStyles.sidebarAddress}>
        <div className={profileStyles.sidebarAddressTitle}>
          <span>Address</span>
          {isMine ? <LocalEditButton onClick={onOpenEdit} /> : null}
        </div>
        {data.detail?.address && data.detail?.address?.length > 0 ? (
          <div className={profileStyles.sidebarAddressContent}>{data.detail.address}</div>
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
