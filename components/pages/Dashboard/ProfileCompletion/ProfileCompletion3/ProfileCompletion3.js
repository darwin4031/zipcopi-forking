import axios from "axios";
import { useContext, useState } from "react";
import Button, { ButtonIcon, ButtonText } from "~components/elements/Button";
import ErrorMessage from "~components/elements/ErrorMessage";
import Radio from "~components/elements/Radio";
import TextField from "~components/elements/TextFieldLegacy";
import IconChevronLeft from "~components/svg/icon-chevron-left.svg";
import { AuthContext } from "~context/auth";
import fieldStateRevalidate from "~utils/fieldStateRevalidate";
import profileStyles from "../ProfileCompletion.module.scss";
import ProfileCompletionAction from "../ProfileCompletionAction";
import ProfileCompletionTitle from "../ProfileCompletionTitle";
import styles from "./ProfileCompletion3.module.scss";

const langOptions = [
  { value: 1, label: "Lang A" },
  { value: 2, label: "Lang B" },
  { value: 3, label: "Lang C" },
  { value: 4, label: "Lang D" },
  { value: 5, label: "Lang E" },
  { value: 6, label: "Lang F" },
];

const radioMapper = {
  Basic: { value: 1, label: "Basic" },
  Fluent: { value: 2, label: "Fluent" },
  Conversational: { value: 3, label: "Conversational" },
  "Native or Bilingual": { value: 4, label: "Native or Bilingual" },
};

const ProfileCompletion3 = ({ onNextStep, onBackStep }) => {
  const { auth } = useContext(AuthContext);

  const initLanguage = [
    {
      // This is a singular lang, why not `language`? it's in the API
      languages: "",
      proficiency: null,
    },
  ];

  const initLanguageError = [
    {
      // This is a singular lang, why not `language`? it's in the API
      languages: null,
      proficiency: null,
    },
  ];

  const [languages, setLanguages] = useState(initLanguage);
  const [languagesError, setLanguagesError] = useState(initLanguageError);
  const [isLoading, setLoading] = useState(false);

  const onChangeField = (key, val, index) => {
    let newLanguages = [...languages];
    newLanguages[index][key] = val;
    setLanguages(newLanguages);

    let newLanguagesError = [...languagesError];
    newLanguagesError[index][key] = validateField(key, val);
    setLanguagesError(newLanguagesError);
  };

  const validateField = (key, val) => {
    let errorField = null;
    if (key === "languages" && !val) errorField = "Please fill this field!";
    if (key === "proficiency" && !val) errorField = "Please select one of them!";
    return errorField;
  };

  const onContinue = () => {
    let isAnyError = false;
    const newLanguagesError = languages.map((language, i) => {
      const { isError, newErrorState } = fieldStateRevalidate(language, validateField);

      if (isError) isAnyError = true;
      return newErrorState;
    });

    setLanguagesError(newLanguagesError);
    //--prod console.log({ isAnyError, newLanguagesError });

    if (!isAnyError) {
      setLoading(true);
      const data = languages.map((lang, i) => {
        return {
          language: lang.languages,
          proficiency: lang.proficiency.label,
        };
      });

      const promises = Promise.all(
        data.map((x) => axios.post(`/writers/${auth?.id}/languages/`, x))
      );

      //--prod console.log({ data });
      //--prod console.log({ promises });

      promises
        .then((results) => {
          //--prod console.log({ results });
          onNextStep();
        })
        .catch((errs) => {
          console.error({ errs });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onAddLanguage = () => {
    setLanguages([...languages, initLanguage[0]]);
    setLanguagesError([...languagesError, initLanguageError[0]]);
  };

  const onDeleteLanguage = () => {
    const newLanguages = languages.slice(0, languages.length - 1);
    const newLanguagesError = languagesError.slice(0, languages.length - 1);
    setLanguages(newLanguages);
    setLanguagesError(newLanguagesError);
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

      <ProfileCompletionTitle>Language preferences</ProfileCompletionTitle>

      <div>
        {languages.map((x, i) => (
          <div key={i} className={styles.languageSingular}>
            <TextField
              className={styles.field}
              label={i === 0 ? "What is your main language?" : "What language?"}
              placeholder="Select language"
              value={languages[i].languages}
              options={langOptions}
              stateKey="languages"
              onChange={(key, value) => onChangeField(key, value, i)}
              errors={languagesError[i]}
            />

            <ProfileCompletionTitle>Select proficiency</ProfileCompletionTitle>
            <Radio
              name="proficiency"
              onChange={(val) => onChangeField("proficiency", val, i)}
              value={languages[i].proficiency}
              className={styles.radioFlex}
              labelClassName={styles.radioCol}
              defaultValue={initLanguage?.[i] ? radioMapper[initLanguage?.[i].proficiency] : null}
              options={[
                { value: 1, label: "Basic" },
                { value: 2, label: "Fluent" },
                { value: 3, label: "Conversational" },
                { value: 4, label: "Native or Bilingual" },
              ]}
            />
            {languagesError[i]["proficiency"] ? (
              <ErrorMessage>{languagesError[i]["proficiency"]}</ErrorMessage>
            ) : null}
          </div>
        ))}
      </div>

      <ProfileCompletionTitle>Do you know another language?</ProfileCompletionTitle>

      <div className={styles.actions}>
        <Button
          className={styles.addLang}
          label="Add another language"
          variant="secondary"
          onClick={onAddLanguage}
        />
        {languages.length > 1 ? (
          <Button
            className={styles.addLang}
            label="Remove language"
            variant="secondary"
            onClick={onDeleteLanguage}
          />
        ) : null}
      </div>

      <ProfileCompletionAction
        onContinue={onContinue}
        onCompleteLater={onNextStep}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCompletion3;
