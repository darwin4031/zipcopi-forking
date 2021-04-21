import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "~context/auth";
import styles from "./ProfileCompletion.module.scss";
import ProfileCompletion1 from "./ProfileCompletion1/ProfileCompletion1";
import ProfileCompletion2 from "./ProfileCompletion2/ProfileCompletion2";
import ProfileCompletion3 from "./ProfileCompletion3/ProfileCompletion3";
import ProfileCompletion4 from "./ProfileCompletion4/ProfileCompletion4";
import ProfileCompletionHeader from "./ProfileCompletionHeader";
import ProfileCompletionStepper from "./ProfileCompletionStepper";

const steps = ["Personal Details", "Professional Details", "Languages", "Verification Test"];
const ProfileCompletion = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [accumulateData, setAccumulateData] = useState({});

  const onPrev = () => {
    if (currentStep === 0) return false;
    setCurrentStep(currentStep - 1);
  };

  const onNext = async (data) => {
    if (isLoading) return false;

    setAccumulateData(data);

    if (currentStep !== steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        // get profile and save to context
        const resProfile = await axios.get("/auth/profile/");
        setAuth(resProfile.data);
      } catch (e) {
        console.error(e);
      } finally {
        router.push({ pathname: `/dashboard/` });
      }
    }
  };

  const stepComponents = [
    <ProfileCompletion1 isLoading={isLoading} onNextStep={onNext} />,
    <ProfileCompletion2
      isLoading={isLoading}
      onNextStep={onNext}
      accumulateData={accumulateData}
      onBackStep={onPrev}
    />,
    <ProfileCompletion3 isLoading={isLoading} onNextStep={onNext} onBackStep={onPrev} />,
    <ProfileCompletion4 isLoading={isLoading} onNextStep={onNext} onBackStep={onPrev} />,
  ];

  return (
    <div className={styles.el}>
      <div className={styles.elBox}>
        <>
          <ProfileCompletionHeader />
          <ProfileCompletionStepper currentStep={currentStep} steps={steps} />
          {stepComponents[currentStep]}
        </>
      </div>
    </div>
  );
};

export default ProfileCompletion;
