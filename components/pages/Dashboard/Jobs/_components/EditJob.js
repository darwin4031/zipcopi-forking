import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import useSWR, { mutate } from "swr";
import * as yup from "yup";
import useOpen from "~hooks/useOpen";
import { fetcher, maybe, setErrors } from "~utils/index";
import Button from "../../../../elements/Button";
import Popup from "../../../../elements/Popup";
import styles from "./EditJob.module.scss";
import JobForm from "./JobForm";

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

  const { isOpen, onOpen, onClose } = useOpen();
  const [files, setFiles] = useState(oldData?.files || []);
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
  const { isSubmitting } = useFormState({ control });

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
    formData.append("is_draft", false);
    if (files && files.length > 0) {
      files.forEach((file, i) => {
        if (!file.id) {
          formData.append(`new_files[${i}]`, file);
        }
      });
    }
    try {
      await axios.put(`/jobs-update/${oldData.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutate(`/jobs/${oldData.id}`);
      onClose();
    } catch (e) {
      const errData = e?.response?.data;
      if (errData) {
        setErrors(setError, errData || {});
      }
    }
  };

  return (
    <>
      <Button className={styles.editButton} label="Edit Job" variant="primary" onClick={onOpen} />
      <Popup isOpen={isOpen} onClose={onClose}>
        <div className={styles.container}>
          <div className={styles.title}>EDIT JOB</div>
          <div className={styles.body}>
            <JobForm
              control={control}
              files={files}
              setFiles={setFiles}
              jobTypeOptions={jobTypeOptions}
              subjectOptions={subjectOptions}
              oldSubjects={[
                { value: oldData.subject_display.id, label: oldData.subject_display.name },
              ]}
              isEdit
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.editButton}
              label="BACK"
              variant="white"
              onClick={onClose}
              isLoading={isSubmitting}
            />
            <Button
              className={styles.editButton}
              label="EDIT"
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </Popup>
    </>
  );
};

const EditJob = ({ data }) => {
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
  if (!subjectData || !typeData) return null;
  return <Base data={data} jobTypeOptions={jobTypeOptions} subjectOptions={subjectOptions} />;
};

export default EditJob;
