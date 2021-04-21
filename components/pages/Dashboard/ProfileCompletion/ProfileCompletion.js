import useUserProfile from "@/hooks/useUserProfile";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import WholeLoading from "~components/elements/WholeLoading";
import { AuthContext } from "~context/AuthContext";
import styles from "./ProfileCompletion.module.scss";
import ProfileCompletion1 from "./ProfileCompletion1/ProfileCompletion1";
import ProfileCompletion2 from "./ProfileCompletion2/ProfileCompletion2";
import ProfileCompletion3 from "./ProfileCompletion3/ProfileCompletion3";
import ProfileCompletion4 from "./ProfileCompletion4/ProfileCompletion4";
import ProfileCompletionHeader from "./ProfileCompletionHeader";
import ProfileCompletionStepper from "./ProfileCompletionStepper";

const ProfileCompletion = () => {
  const { auth } = useContext(AuthContext);
  const { data, isFetching } = useUserProfile(auth.user_id, auth.role);

  const steps = [
    "Personal Details",
    "Proffesional Details",
    // "Enterprise Level",
    "Languages",
    "Verification Test",
    // "Payment Details",
  ];

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const onPrev = () => {
    if (currentStep === 0) return false;
    setCurrentStep(currentStep - 1);
  };

  const [accumulateData, setAccumulateData] = useState({});

  const onNext = (data) => {
    if (isLoading) return false;

    setAccumulateData(data);

    if (currentStep !== steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      router.push({ pathname: `/dashboard/` });
    }
  };

  const stepComponents = [
    <ProfileCompletion1 userData={data} isLoading={isLoading} onNextStep={onNext} />,
    <ProfileCompletion2
      userData={data}
      isLoading={isLoading}
      onNextStep={onNext}
      accumulateData={accumulateData}
      onBackStep={onPrev}
    />,
    <ProfileCompletion3
      userData={data}
      isLoading={isLoading}
      onNextStep={onNext}
      onBackStep={onPrev}
    />,
    <ProfileCompletion4
      userData={data}
      isLoading={isLoading}
      onNextStep={onNext}
      onBackStep={onPrev}
    />,
  ];

  return (
    <div className={styles.el}>
      <div className={styles.elBox}>
        {isFetching ? (
          <div className={styles.fetchingLoader}>
            <WholeLoading />
          </div>
        ) : (
          <>
            <ProfileCompletionHeader />
            <ProfileCompletionStepper currentStep={currentStep} steps={steps} />
            {stepComponents[currentStep]}
          </>
        )}
        {/* <div style={{ marginTop: 10 }}>
          <Button label="Prev" variant="primary" onClick={onPrev} />
          <Button label="Next" variant="primary" onClick={onNext} />
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCompletion;
