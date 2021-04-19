import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Button from "~components/elements/Button";
import ErrorMessage from "~components/elements/ErrorMessage";
import Popup from "~components/elements/Popup";
import TextField from "~components/elements/TextField";
import IconStar from "~components/svg/icon-star.svg";
import styles from "./RatingPopup.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState, Controller, useWatch } from "react-hook-form";

const schema = yup.object().shape({
  rate: yup.number().min(1).max(5).required().positive().integer(),
  note: yup.string().required(),
});

const RatingPopup = ({
  rateFor,
  onCancel: propOnCancel = () => {},
  onSubmit: propOnSubmit = () => {},
  isOpen,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const { control, handleSubmit, register, unregister, setValue } = useForm({
    defaultValues: {
      rate: 1,
      note: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting, errors } = useFormState({ control });
  const rate = useWatch({ control, name: "rate", defaultValue: 1 });

  useEffect(() => {
    register("rate");
    return () => {
      unregister("rate");
    };
  }, []);

  return (
    <Popup classNameBox={styles.popupBox} isOpen={isOpen}>
      <div className={styles.root}>
        <h6 className={styles.title}>Rate {rateFor}</h6>
        <div className={styles.stars}>
          {stars.map((val, i) => (
            <button
              key={i}
              className={clsx("reset-button", styles.btn, val <= rate && styles.isActive)}
              onClick={() => setValue("rate", val, { shouldValidate: true, shouldDirty: true })}
            >
              <IconStar className={styles.btnStar} />
            </button>
          ))}
        </div>

        {/* Rating error message */}
        {errors?.rate ? (
          <ErrorMessage className={styles.starsErr}>{errors?.rate?.message}</ErrorMessage>
        ) : null}

        <div className={styles.review}>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="text"
                label="Write review"
                placeholder="Your review ..."
                value={value}
                onChange={(val) => onChange(val)}
                error={error}
              />
            )}
          />
        </div>
        <div className={styles.actions}>
          <div>
            <Button
              className={styles.actionsBtn}
              label="Cancel"
              variant="secondary"
              onClick={propOnCancel}
            />
          </div>
          <div>
            <Button
              className={styles.actionsBtn}
              label="Confirm"
              variant="primary"
              onClick={handleSubmit(propOnSubmit)}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default RatingPopup;
