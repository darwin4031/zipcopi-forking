import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import mc from "@/utils/mergeClassName";
import { useRouter } from "next/router";
import Checkbox from "../Checkbox/Checkbox";
import GeneralLink from "../GeneralLink/GeneralLink";
import styles from "./ProfileCompletionChecklist.module.scss";

const ACTIONS = {
  uploadProfilePic: 1,
  uploadCV: 2,
  completeVerificationTest: 1,
};

const ProfileCompletionChecklist = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);

  const checklist = [
    {
      action: ACTIONS.uploadProfilePic,
      label: "Upload profile picture",
      isChecked: auth.completed_profile_detail.hasAvatar,
    },
    {
      action: ACTIONS.uploadCV,
      label: "Select writing and premium type",
      isChecked:
        auth.completed_profile_detail.hasJobType &&
        auth.completed_profile_detail.hasPremiumType,
    },
    {
      action: ACTIONS.completeVerificationTest,
      label: "Complete Verification Test",
      isChecked: auth.completed_profile_detail.hasSubmitedEssay,
    },
  ];

  const handleAction = (isChecked) => {
    if (!isChecked) {
      router.push("/profile-completion");
    }
    // if (item.action === ACTIONS.uploadProfilePic) {
    //   //--prod console.log("ACTIONS.uploadProfilePic");
    //   router.push("/dashboard/profile-completion");
    // } else if (item.action === ACTIONS.uploadCV) {
    //   //--prod console.log("ACTIONS.uploadCV");
    //   router.push("/dashboard/profile-completion");
    // } else if (item.action === ACTIONS.completeVerificationTest) {
    //   //--prod console.log("ACTIONS.completeVerificationTest");
    //   router.push("/dashboard/profile-completion");
    // }
  };

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        {checklist.map((item, i) => (
          <button
            key={i}
            className={mc(styles.button, "reset-button")}
            onClick={() => handleAction(item.isChecked)}
          >
            <Checkbox
              stateKey="rememberMe"
              readOnly={true}
              checked={item.isChecked ? true : false}
              className={styles.checkbox}
              indicatorClassName={styles.checkboxIndicator}
              checkSvgClassName={styles.checkSvgClassName}
              labelClassName={styles.checkboxWrapper}
            >
              {item.label}
            </Checkbox>
          </button>
        ))}

        {/* <div className={styles.footer}>
          <GeneralLink className={styles.generalLink} href="/w/dashboard/#">
            Get a higher rating
          </GeneralLink>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCompletionChecklist;
