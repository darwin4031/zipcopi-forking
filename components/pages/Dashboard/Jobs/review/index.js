import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { mutate } from "swr";
import * as yup from "yup";
import Button from "~components/elements/Button";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextField";
import JobDetailContainer from "~components/layouts/JobDetailContainer";
import jobDetailStyles from "~components/layouts/JobDetailContainer/JobDetailContainer.module.scss";
import IconAmends from "~components/svg/icon-amend.svg";
import { AuthContext } from "~context/auth";
import EditJob from "../_components/EditJob";
import JobDetails from "../_components/JobDetails";
import JobWriterWorkHistories from "../_components/JobWriterWorkHistories";
import WriterWork from "../_components/WriterWork";
import styles from "./index.module.scss";

const schema = yup.object().shape({
  text_to_change: yup.string().required("This field is required."),
});

const JobButton = ({ data: job }) => {
  const [loading, setLoading] = useState(false);
  const [isOpenAmendPopup, setOpenAmendPopup] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      text_to_change: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = useFormState({ control });

  const onRequestAmend = () => {
    setOpenAmendPopup(true);
  };

  const onAmendCancel = () => {
    setOpenAmendPopup(false);
  };

  const onApprove = async () => {
    setLoading(true);
    try {
      await axios.post(`/jobs/${job.id}/complete/`);
      await mutate(`/jobs/${job.id}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const onAmendSubmit = async (data) => {
    try {
      await axios.post(`/jobs/${job.id}/amend/`, data);
      await mutate(`/jobs/${job.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button
        className={styles.sidebarBtn}
        label="Approve Order"
        variant="primary"
        onClick={onApprove}
        isLoading={loading || isSubmitting}
      />
      <Button
        className={styles.sidebarBtn}
        label="Request Amends"
        variant="secondary"
        isLoading={loading || isSubmitting}
        onClick={onRequestAmend}
      />
      <Button
        className={clsx(styles.sidebarBtn, styles.sidebarBtnReport)}
        label="Report Job"
        isLoading={loading || isSubmitting}
      />
      <Popup classNameBox={styles.amendBox} isOpen={isOpenAmendPopup}>
        <div className={styles.amendIcon}>
          <IconAmends />
        </div>
        <h4 className={styles.amendTitle}>Request Amend</h4>
        <Controller
          control={control}
          name="text_to_change"
          render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => {
            return (
              <TextField
                className={styles.amendTextField}
                textareaClassName={styles.amendTextFieldTextarea}
                label="Note"
                placeholder="Insert amend note ..."
                multiline={true}
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            );
          }}
        />
        <div className={styles.amendActions}>
          <div>
            <Button
              className={styles.amendAction}
              label="Cancel"
              variant="secondary"
              isLoading={loading || isSubmitting}
              onClick={onAmendCancel}
            />
          </div>
          <div>
            <Button
              className={styles.amendAction}
              label="Submit"
              variant="primary"
              onClick={handleSubmit(onAmendSubmit)}
              isLoading={loading || isSubmitting}
            />
          </div>
        </div>
      </Popup>
    </>
  );
};

const JobReview = ({ data }) => {
  const { auth } = useContext(AuthContext);
  return (
    <JobDetailContainer>
      <div className={jobDetailStyles.body}>
        <WriterWork data={data.latest_work} />
        <JobWriterWorkHistories jobId={data.id} />
      </div>
      <div className={jobDetailStyles.sidebar}>
        {auth?.role === "client" ? (
          <JobButton data={data} />
        ) : (
          <div className={jobDetailStyles.status}>Being reviewed</div>
        )}
        {auth?.role === "client" && <EditJob data={data} />}
        <JobDetails job={data} withBrief />
      </div>
    </JobDetailContainer>
  );
};

export default JobReview;
