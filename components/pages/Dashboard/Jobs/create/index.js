import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";
import Button, { ButtonText } from "~components/elements/Button";
import ConfirmationPopup from "~components/elements/ConfirmationPopup";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import { fetcher, maybe, setErrors } from "~utils/index";
import JobForm from "../_components/JobForm";
import styles from "./index.module.scss";

const schema = yup.object().shape({
  type: yup.string().required("Please fill this field!"),
  subject: yup.string().required("Please fill this field!"),
  premium_job: yup.string().required("Please fill this field!"),
  word_count: yup.number().required("Please fill this field!").positive().integer(),
  company: yup.string().required("Please fill this field!"),
  company_url: yup.string().url(),
  brief: yup.string().required("Please fill this field!"),
  bulk_quantity: yup.number().required("Please fill this field!").positive().integer(),
  keywords: yup.string(),
});

const JobCreate = () => {
  const router = useRouter();
  // TODO: change subjects and typeData to get it from apis realtime
  const { data: subjectData } = useSWR("/jobs/subjects/", fetcher);
  const { data: typeData } = useSWR("/jobs/types/", fetcher);
  const jobTypeOptions = maybe(
    () => typeData?.results.map((item) => ({ value: item.id, label: item.name })),
    []
  );
  const subjectOptions = maybe(
    () => subjectData?.results.map((item) => ({ value: item.id, label: item.name })),
    []
  );

  const [files, setFiles] = useState([]);
  const [isOpenConfirmation, setOpenConfirmation] = useState(false);
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      type: "",
      subject: "",
      premium_job: "",
      word_count: 1,
      company: "",
      company_url: "",
      brief: "",
      bulk_quantity: 1,
      keywords: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting, errors } = useFormState({ control });
  const onSubmit = async (data, isDraft) => {
    const keywords = data.keywords.split(",").map((keyword) => keyword.trim());
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "keywords") {
        formData.append(key, keywords);
      } else {
        formData.append(key, data[key]);
      }
    });
    formData.append("is_draft", isDraft ? "true" : "false");
    if (files && files.length > 0) {
      files.forEach((file, i) => {
        if (!file.id) {
          formData.append(`new_files[${i}]`, file);
        }
      });
    }
    try {
      const { data: resData } = await axios.post("/jobs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/dashboard/jobs/${resData.id}`);
    } catch (e) {
      const errData = e.response.data;
      setErrors(setError, errData || {});
    }
  };

  const openConfirmationPrompt = () => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    setOpenConfirmation(true);
  };

  // TODO: CHANGE TO AUTOCOMPLETE
  if (!subjectData || !typeData) return <LoadingWrapper />;

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h3 className={styles.title}>Make an order</h3>
        <JobForm
          control={control}
          files={files}
          setFiles={setFiles}
          jobTypeOptions={jobTypeOptions}
          subjectOptions={subjectOptions}
        />

        <div className={styles.actions}>
          <Button
            className={styles.continueBtn}
            variant="primary"
            onClick={openConfirmationPrompt}
            isLoading={isSubmitting}
          >
            <ButtonText>Submit Job</ButtonText>
          </Button>
          <Button
            className={styles.laterBtn}
            onClick={() => {
              handleSubmit((data) => onSubmit(data, true))();
            }}
            isLoading={isSubmitting}
          >
            <ButtonText>Save for later</ButtonText>
          </Button>
        </div>
        <ConfirmationPopup
          title="Are you sure everything is correct?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus neque turpis, dapibus"
          cancelText="Check again"
          submitText="Yes"
          isOpen={isOpenConfirmation}
          onCancel={() => setOpenConfirmation(false)}
          onSubmit={() => {
            handleSubmit((data) => onSubmit(data, false))();
            setOpenConfirmation(false);
          }}
        />
      </div>
    </div>
  );
};

export default JobCreate;
