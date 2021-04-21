import { useMeasure } from "react-use";
import styles from "./ProfileCompletionStepper.module.scss";
import ProfileCompletionStepperItem from "./ProfileCompletionStepperItem";

/**
 * ProfileCompletionStepper
 * @param {Object} props
 * @param {Number} props.currentStep
 */
const ProfileCompletionStepper = ({ currentStep, steps }) => {
  const [wrapperRef, { width: wrapperWidth }] = useMeasure();
  const [innerRef, { width: innerWidth }] = useMeasure();

  return (
    <div className={styles.stepperOverflow}>
      <div
        ref={wrapperRef}
        className={styles.stepper}
        style={{
          transform: `translateX(-${
            currentStep * ((innerWidth - wrapperWidth) / (steps.length - 1))
          }px)`,
        }}
      >
        <div ref={innerRef} className={styles.stepperInner}>
          {steps.map((item, i) => (
            <ProfileCompletionStepperItem
              key={i}
              isFirstItem={i === 0}
              isLastItem={i === steps.length - 1}
              isCompleted={currentStep > i}
              isActive={currentStep === i}
            >
              {item}
            </ProfileCompletionStepperItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionStepper;
