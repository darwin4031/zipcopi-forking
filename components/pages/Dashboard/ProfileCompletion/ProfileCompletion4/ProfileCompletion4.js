import axios from "axios";
import clsx from "clsx";
import { useContext, useState } from "react";
import Button, { ButtonIcon, ButtonText } from "~components/elements/Button";
import IconChevronLeft from "~components/svg/icon-chevron-left.svg";
import TextField from "~components/elements/TextFieldLegacy";
import Timer from "~components/elements/Timer";
import { AuthContext } from "~context/auth";
import countWordsLeft from "~utils/countWordsLeft";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import profileStyles from "../ProfileCompletion.module.scss";
import ProfileCompletionAction from "../ProfileCompletionAction";
import styles from "./ProfileCompletion4.module.scss";

const LIMIT = 200;

const ProfileCompletion4 = ({ onNextStep, onBackStep }) => {
  const { auth } = useContext(AuthContext);
  const initFieldState = {
    essay: "",
  };
  const [fieldState, setFieldState] = useState(initFieldState);
  const [errorState, setErrorState] = useState(initFieldState);
  const [isLoading, setLoading] = useState(false);

  const onChangeField = (key, val) => {
    setErrorState({ ...errorState, [key]: validateField(key, val) });
    setFieldState({ ...fieldState, [key]: val });
  };

  const validateField = (key, val) => {
    let errorField = null;
    if (key === "essay" && !val) errorField = "Please fill this field!";
    return errorField;
  };

  const onContinue = () => {
    const { isError, newErrorState } = fieldStateRevalidate(fieldState, validateField);

    setErrorState(newErrorState);

    if (!isError) {
      setLoading(true);
      axios
        .post(`/writers/${auth.id}/verification/`, {
          essay: fieldState.essay,
        })
        .then((res) => {
          //--prod console.log("verification", { res });
          setLoading(false);
          onNextStep();
        })
        .catch((err) => {
          console.log(err.response.data);
          console.error("verification", { err });
        });
    }
  };

  return (
    <div>
      {onBackStep ? (
        <div className={profileStyles.backWrapper}>
          <Button variant="secondary" onClick={onBackStep} className={profileStyles.back}>
            <ButtonIcon svg={IconChevronLeft} />
            <ButtonText>Back</ButtonText>
          </Button>
        </div>
      ) : null}

      <div className={styles.profileCompletionBoxEdge}>
        <div className={styles.instruction}>
          Write 200 words on how to save money. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor
        </div>
      </div>

      <div className={clsx(styles.profileCompletionBoxEdge, styles.infoWrapper)}>
        <div className={styles.info}>
          <div className={styles.infoTimer}>
            Time Left:
            <Timer className={styles.infoTimerComp} duration={3600} onTimeout={onContinue} />
          </div>
          <div className={styles.infoWords}>
            {countWordsLeft(fieldState.essay, LIMIT)} Word Left
          </div>
        </div>
      </div>

      <TextField
        className={styles.field}
        stateKey="essay"
        type="text"
        label="Verification essay"
        placeholder="Write 200 words"
        onChange={onChangeField}
        errors={errorState}
        multiline={true}
        limit={LIMIT}
        disableCopyPaste={true}
      />

      <ProfileCompletionAction
        onContinue={onContinue}
        withCompleteLater={false}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCompletion4;
