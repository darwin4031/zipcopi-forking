import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import useSWR, { mutate } from "swr";
import * as yup from "yup";
import Button, { ButtonText } from "~components/elements/Button";
import ConfirmationPopup from "~components/elements/ConfirmationPopup";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import useOpen from "~hooks/useOpen";
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

const Base = (props) => {
  const { data: oldData, jobTypeOptions, subjectOptions } = props;

  const router = useRouter();
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useOpen();
  const [files, setFiles] = useState(oldData?.files || []);
  const [isOpenConfirmation, setOpenConfirmation] = useState(false);
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      type: oldData.type,
      subject: oldData.subject,
      premium_job: oldData.premium_job,
      word_count: oldData.word_count,
      company: oldData.company,
      company_url: oldData.company_url,
      brief: oldData.brief,
      bulk_quantity: oldData.bulk_quantity,
      keywords: oldData.keywords.join(", "),
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
    formData.append("is_draft", isDraft);
    if (files && files.length > 0) {
      files.forEach((file, i) => {
        if (!file.id) {
          formData.append(`new_files[${i}]`, file);
        }
      });
    }
    try {
      const { data: resData } = await axios.put(`/jobs/${oldData.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutate(`/jobs/${resData.id}`, resData);
    } catch (e) {
      const errData = e?.response?.data;
      if (errData) {
        setErrors(setError, errData || {});
      }
    }
  };

  const openConfirmationPrompt = () => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    setOpenConfirmation(true);
  };

  const onDeleteDraft = async () => {
    try {
      await axios.delete(`/jobs/${oldData.id}`);
      router.push("/dashboard/jobs/in-progress");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h3 className={styles.title}>Draft: #{oldData.id}</h3>
        <JobForm
          control={control}
          files={files}
          setFiles={setFiles}
          jobTypeOptions={jobTypeOptions}
          subjectOptions={subjectOptions}
          oldSubjects={[
            { value: oldData.subject_display.id, label: oldData.subject_display.name },
          ]}
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
          <Button
            className={styles.laterBtn}
            variant="error"
            onClick={onOpenError}
            isLoading={isSubmitting}
          >
            <ButtonText>Delete Draft</ButtonText>
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
        <ConfirmationPopup
          title="Are you sure you want delete this draft?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus neque turpis, dapibus"
          cancelText="CANCEL"
          submitText="DELETE"
          isOpen={isOpenError}
          onCancel={onCloseError}
          onSubmit={onDeleteDraft}
        />
      </div>
    </div>
  );
};

const JobDraft = ({ data }) => {
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

  if (!subjectData || !typeData) return <LoadingWrapper />;
  return <Base data={data} jobTypeOptions={jobTypeOptions} subjectOptions={subjectOptions} />;
};

export default JobDraft;
