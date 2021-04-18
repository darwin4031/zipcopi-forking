import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import { mutate } from "swr";
import Button from "~components/elements/Button";
import Checkbox from "~components/elements/Checkbox";
import UploadFile from "../../_components/UploadFile";
import styles from "./JobForm.module.scss";

const Editor = dynamic(() => import("~components/elements/Editor/Editor"), {
  ssr: false,
});

const JobForm = ({ data }) => {
  const { id } = data;
  const [loading, setLoading] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [files, setFiles] = useState([]);
  const [checkboxError, setCheckboxError] = useState(false);
  const [output, setOutput] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const onSubmit = async () => {
    if (!declared) {
      setCheckboxError(true);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("content", JSON.stringify(output));
    if (files.length > 0) {
      files.forEach((file, i) => {
        formData.append(`new_files[${i}]`, file);
      });
    }
    try {
      await axios.post(`/jobs/${id}/writer_works/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutate(`/jobs/${id}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <Editor value={output} onChange={(newVal) => setOutput(newVal)} />
      <UploadFile
        label="Upload file (.docx, odt, .rtf, .txt)"
        value={files}
        multiple={true}
        className={styles.upload}
        onChange={(files) => setFiles(files)}
      />
      <Checkbox
        checked={declared}
        error={checkboxError ? { message: "Please check this field!" } : undefined}
        onChange={(checked) => {
          setCheckboxError(false);
          setDeclared(checked);
        }}
      >
        I declare that this work is my own submission
      </Checkbox>
      <Button variant="primary" isLoading={loading} className={styles.button} onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default JobForm;
