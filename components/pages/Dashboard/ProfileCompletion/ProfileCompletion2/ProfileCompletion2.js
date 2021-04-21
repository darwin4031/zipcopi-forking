import axios from "axios";
import { useContext, useState } from "react";
import Button, { ButtonIcon, ButtonText } from "~components/elements/Button";
import SelectBox from "~components/elements/SelectBox";
import TextField from "~components/elements/TextFieldLegacy";
import IconChevronLeft from "~components/svg/icon-chevron-left.svg";
import { premiumJob } from "~config/enums";
import { AuthContext } from "~context/auth";
import styles from "../ProfileCompletion.module.scss";
import ProfileCompletionAction from "../ProfileCompletionAction";
import ProfileCompletionTitle from "../ProfileCompletionTitle";

const premiumJobOptions = Object.keys(premiumJob).map((key) => ({
  value: premiumJob[key].value,
  label: premiumJob[key].display,
}));

const ProfileCompletion2 = ({ onNextStep, accumulateData, userData, onBackStep }) => {
  const { auth } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);

  const initFieldState = {
    acceptedJobs: userData?.writerDetail?.accepted_jobs ?? [],
    industriesType: userData?.writerDetail?.industry_experiences ?? [],
  };
  const [fieldState, setFieldState] = useState(initFieldState);

  const initErrorState = {
    acceptedJobs: null,
    industriesType: [null],
  };
  const [errorState, setErrorState] = useState(initErrorState);

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
    const accepted_jobs = fieldState.acceptedJobs.map((item) => item.value);
    const industry_experiences = fieldState.industriesType;
    let data = accumulateData;
    data.detail = {
      ...data.detail,
      accepted_jobs,
      industry_experiences,
    };
    patchUserData(auth.id, data).then(() => {
      setLoading(false);
      onNextStep();
    });
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

  return (
    <div>
      {onBackStep ? (
        <div className={styles.backWrapper}>
          <Button variant="secondary" onClick={onBackStep} className={styles.back}>
            <ButtonIcon svg={IconChevronLeft} />
            <ButtonText>Back</ButtonText>
          </Button>
        </div>
      ) : null}

      <ProfileCompletionTitle>What types of premium type do you want?</ProfileCompletionTitle>
      <SelectBox
        className={styles.field}
        label="Premium Type"
        placeholder="Select premium type"
        value={fieldState.acceptedJobs}
        options={premiumJobOptions}
        onChange={(val) => onChangeField("acceptedJobs", val)}
        isMulti={true}
        defaultValue={initFieldState.acceptedJobs}
      />

      <ProfileCompletionTitle>Industries you previously worked</ProfileCompletionTitle>
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

      <ProfileCompletionAction
        onContinue={onContinue}
        onCompleteLater={onNextStep}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCompletion2;
