import Button, { ButtonIcon, ButtonText } from "~components/Button/Button";
import SelectBox from "~components/SelectBox/SelectBox";
import IconChevronLeft from "~components/svg/icon-chevron-left.svg";
import TextField from "~components/TextField/TextField";
import WholeLoading from "~components/WholeLoading";
import { AuthContext } from "~context/AuthContext";
import useJobPropertiesData from "@/hooks/useJobPropertiesData";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import axios from "axios";
import React, { useContext, useState } from "react";
import styles from "../ProfileCompletion.module.scss";
import ProfileCompletionAction from "../ProfileCompletionAction";
import ProfileCompletionTitle from "../ProfileCompletionTitle";

const industryOptions = [
  { value: 1, label: "Type A" },
  { value: 2, label: "Type B" },
  { value: 3, label: "Type C" },
  { value: 4, label: "Type D" },
  { value: 5, label: "Type E" },
  { value: 6, label: "Type F" },
];

const ProfileCompletion2 = ({ onNextStep, accumulateData, userData, onBackStep }) => {
  const { auth } = useContext(AuthContext);

  const { jobTypes, premiumJobs, isLoading: isFetching } = useJobPropertiesData();
  const [isLoading, setLoading] = useState(false);

  const initFieldState = {
    writingType: userData?.detail?.job_type_display.map((x, i) => ({
      value: x.id,
      label: x.name,
    })),
    premiumJobs: userData?.detail?.premium_type_display.map((x, i) => ({
      value: x.id,
      label: x.name,
    })),
    industriesType: userData?.detail?.industry_experiences ?? [],
    selectedCV: null,
  };
  const [fieldState, setFieldState] = useState(initFieldState);

  const initErrorState = {
    writingType: null,
    premiumJobs: null,
    industriesType: [null],
    selectedCV: null,
  };
  const [errorState, setErrorState] = useState(initErrorState);

  //--prod console.log({ initFieldState });

  const onChangeField = (key, val) => {
    setErrorState({ ...errorState, [key]: validateField(key, val) });
    setFieldState({ ...fieldState, [key]: val });
  };

  const validateField = (key, val) => {
    let errorField = null;
    if (key === "writingType" && !val) errorField = "Please fill this field!";
    if (!val) errorField = "Please fill this field!";
    return errorField;
  };

  const patchUserData = (userId, data) => {
    return axios
      .patch(`/writers/${userId}/`, data)
      .then((res) => {
        //--prod console.log({ res });
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  const onContinue = () => {
    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField, {
      includeKey: ["writingType", "premiumJobs"],
    });

    let isIndustryError = false;
    const industryError = fieldState.industriesType.map((x, i) => {
      const isErr = validateField("industryType", x);
      if (isErr) isIndustryError = true;
      return isErr;
    });

    setErrorState({ ...newErrorState, industriesType: industryError });

    if (!isError && !isIndustryError) {
      setLoading(true);

      const job_type = fieldState.writingType.map((x) => x.value);
      const premium_type = fieldState.premiumJobs.map((x) => x.value);
      const industry_experiences = fieldState.industriesType;
      // const industry_experiences = fieldState.industriesType.map(
      //   (x) => x.label,
      // );

      let data = accumulateData;
      // data.email = userData.email;
      // data.phone = userData.phone;
      data.detail = {
        ...data.detail,
        job_type,
        premium_type,
        industry_experiences,
      };

      patchUserData(auth.user_id, data).then(() => {
        setLoading(false);
        onNextStep();
      });

      // setTimeout(() => {
      //   setLoading(false);
      //   onNextStep();
      // }, 2000);
    }
  };

  const onChangeIndustry = (i, val) => {
    const newIndustry = [...fieldState.industriesType];
    const newIndustryError = [...errorState.industriesType];
    newIndustry[i] = val;
    newIndustryError[i] = validateField("industryType", val);
    setErrorState({ ...errorState, industriesType: newIndustryError });
    setFieldState({ ...fieldState, industriesType: newIndustry });
  };

  const onRemoveIndustry = (index) => {
    const newVal = fieldState.industriesType.filter((x, i) => i !== index);
    const newErr = errorState.industriesType.filter((x, i) => i !== index);
    setFieldState({ ...fieldState, industriesType: newVal });
    setErrorState({ ...errorState, industriesType: newErr });
  };

  const onAddIndustry = () => {
    setFieldState({
      ...fieldState,
      industriesType: [...fieldState.industriesType, ""],
    });
    setErrorState({
      ...errorState,
      industriesType: [...errorState.industriesType, null],
    });
  };

  return isFetching ? (
    <div className={styles.fetchingLoader}>
      <WholeLoading />
    </div>
  ) : (
    <div>
      {onBackStep ? (
        <div className={styles.backWrapper}>
          <Button variant="secondary" onClick={onBackStep} className={styles.back}>
            <ButtonIcon svg={IconChevronLeft} />
            <ButtonText>Back</ButtonText>
          </Button>
        </div>
      ) : null}

      <ProfileCompletionTitle>What types of writing do you do?</ProfileCompletionTitle>

      <SelectBox
        className={styles.field}
        label="Writing Type"
        placeholder="Select writing type"
        value={fieldState.writingType}
        options={jobTypes}
        onChange={(val) => onChangeField("writingType", val)}
        isMulti={true}
        defaultValue={initFieldState.writingType}
      />

      <ProfileCompletionTitle>What types of premium type do you want?</ProfileCompletionTitle>

      <SelectBox
        className={styles.field}
        label="Premium Type"
        placeholder="Select premium type"
        value={fieldState.premiumJobs}
        options={premiumJobs}
        onChange={(val) => onChangeField("premiumJobs", val)}
        isMulti={true}
        defaultValue={initFieldState.premiumJobs}
      />

      <ProfileCompletionTitle>Industries you previously worked</ProfileCompletionTitle>

      {/* Industry experience using selectbox */}
      {/* <SelectBox
        className={styles.field}
        label="Industries"
        placeholder="Select industry"
        value={fieldState.industriesType}
        options={industryOptions}
        onChange={(val) => onChangeField("industriesType", val)}
        isMulti={true}
      /> */}

      <div className={styles.industries}>
        {/* Indusctry experience using text */}
        {fieldState.industriesType.map((industry, i) => (
          <div className={styles.industry} key={i}>
            <TextField
              type="text"
              placeholder="Industry name ..."
              onChange={(key, val) => onChangeIndustry(i, val)}
              stateKey="industryType"
              errors={{ industryType: errorState.industriesType[i] }}
              value={industry}
            />
            {fieldState.industriesType.length > 1 ? (
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

      {/* <ProfileCompletionTitle>Upload your CV</ProfileCompletionTitle>
      <div className={styles.field}>
        <UploadFile
          value={fieldState.selectedCV}
          label="Upload CV"
          onChange={(files) => onChangeField("selectedCV", files)}
        />
      </div> */}

      <ProfileCompletionAction
        onContinue={onContinue}
        onCompleteLater={onNextStep}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCompletion2;
