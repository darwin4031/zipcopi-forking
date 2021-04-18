import { Controller } from "react-hook-form";
import SelectBox from "~components/elements/SelectBox";
import TextField from "~components/elements/TextField";
import styles from "./JobForm.module.scss";
import JobPremiumChoices from "./JobPremiumChoices";
import UploadFile from "./UploadFile";

const OrderForm = (props) => {
  const { control, files, setFiles, jobTypeOptions = [], subjectOptions = [] } = props;

  return (
    <>
      <div className={styles.flex}>
        <div className={styles.col}>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => {
              return (
                <SelectBox
                  className={styles.field}
                  label="Job Type"
                  placeholder="Select job type"
                  value={jobTypeOptions.filter((x) => x.value === value)[0]}
                  options={jobTypeOptions}
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                  error={error}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
              <SelectBox
                className={styles.field}
                label="Subject"
                placeholder="Select subject"
                value={subjectOptions.filter((x) => x.value === value)[0]}
                options={subjectOptions}
                onChange={(val) => onChange(val.value)}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name="company"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={styles.field}
                type="text"
                label="Company / Organization"
                placeholder="Enter Company / Organization details"
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name="keywords"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={styles.field}
                type="text"
                label="Keywords"
                placeholder="eg. Technical, Sporty News"
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            )}
          />
        </div>
        <div className={styles.col}>
          <Controller
            control={control}
            name="word_count"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={styles.field}
                type="text"
                label="Word count"
                placeholder="Enter estimated word count"
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name="premium_job"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <JobPremiumChoices
                className={styles.field}
                label="Premium Job"
                placeholder="Please Select"
                onChange={(val) => onChange(val)}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name="company_url"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={styles.field}
                type="text"
                label="Company / Organization Url"
                placeholder="Enter Company / Organization url"
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name="bulk_quantity"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={styles.field}
                type="text"
                label="Quantity"
                placeholder="Enter estimated word count"
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            )}
          />
        </div>
      </div>
      <Controller
        control={control}
        name="brief"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={styles.field}
            type="text"
            label="Brief"
            placeholder="Write or upload brief/s documents and supporting files, images etc"
            value={value}
            onChange={(val) => onChange(val)}
            error={error}
            multiline={true}
          />
        )}
      />
      <UploadFile
        label="Upload file or document"
        value={files}
        multiple={true}
        className={styles.upload}
        onChange={(files) => setFiles(files)}
      />
    </>
  );
};

export default OrderForm;
