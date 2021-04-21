import { Children, useEffect, useRef, useState } from "react";
import ErrorMessage from "~components/elements/ErrorMessage";
import countWords from "./countWords";
import countWordsLeft from "./countWordsLeft";
import getUnique from "./getUnique";
import styles from "./TextField.module.scss";
import clsx from "clsx";

const TextFieldLabel = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx(styles.label, className)}>
      {children}
    </div>
  );
};

/**
 * TextField
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.stateKey
 * @param {String} props.className
 * @param {String} props.labelClassName
 * @param {String} props.inputClassName
 * @param {String} props.textareaClassName
 * @param {String} props.type
 * @param {String} props.placeholder
 * @param {Object} props.errors
 * @param {Boolean} props.multiline
 * @param {Number} props.limit
 * @param {Boolean} props.disableCopyPaste
 * @param {String} props.defaultValue
 * @param {String} props.autoComplete
 * @param {Function} props.onChange
 * @param {Function} props.onNativeChange
 * @param {Boolean} props.readOnly
 * @param {Object} props.style
 * @param {String} props.name
 */
const TextField = ({
  children,
  stateKey,
  label,
  className,
  labelClassName,
  inputClassName,
  textareaClassName,
  type,
  placeholder,
  errors,
  multiline,
  limit,
  disableCopyPaste,
  defaultValue,
  value,
  autoComplete,
  onChange: propOnChange,
  onNativeChange: propOnNativeChange,
  readOnly = false,
  style: propStyle,
  name,
}) => {
  const inputRef = useRef();
  const [uniqueID, setUniqueID] = useState();
  const [nWords, setNWords] = useState(0);

  useEffect(() => {
    const uniqueID = `input-${getUnique()}`;
    setUniqueID(uniqueID);

    let localDisableCopyPaste = disableCopyPaste;
    let copyCutPasteHandler = (e) => e.preventDefault();

    if (localDisableCopyPaste) {
      document.addEventListener("copy", copyCutPasteHandler);
      document.addEventListener("cut", copyCutPasteHandler);
      document.addEventListener("paste", copyCutPasteHandler);
    }
    return () => {
      if (localDisableCopyPaste) {
        document.removeEventListener("copy", copyCutPasteHandler);
        document.removeEventListener("cut", copyCutPasteHandler);
        document.removeEventListener("paste", copyCutPasteHandler);
      }
    };
  }, [inputRef]);

  const LabelChildren = Children.map(children, (child) => {
    if (child.type === TextFieldLabel) {
      return child;
    } else {
      return null;
    }
  });

  const onChange = (e) => {
    if (limit && limit > 0) setNWords(countWords(e.target.value));
    if (propOnChange) propOnChange(stateKey, e.target.value);
    if (propOnNativeChange) propOnNativeChange(e);
  };

  const onKeyDown = (e) => {
    const BACKSPACE = 8;
    const DELETE = 46;
    const allowedKeys = [BACKSPACE, DELETE];
    const isNotAllowedKeys = allowedKeys.indexOf(e.keyCode) == -1;
    const isOverload = countWordsLeft(e.target.value, limit) === 0;

    if (limit && limit > 0 && isOverload && isNotAllowedKeys) {
      // if limit set, and string length exceed the limit then stop it
      return e.preventDefault();
    }
  };

  return (
    <div className={clsx(styles.el, className)} style={propStyle}>
      {LabelChildren ? (
        LabelChildren
      ) : (
        <label className={clsx(styles.label, labelClassName)} htmlFor={uniqueID}>
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          id={uniqueID}
          className={clsx(styles.textarea, textareaClassName)}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          id={uniqueID}
          type={type}
          className={clsx(styles.input, inputClassName)}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          readOnly={readOnly}
        />
      )}

      {disableCopyPaste ? (
        <div className={styles.info}>
          <div className={styles.disableCopyPaste}>You can’t copy/paste here</div>

          {limit && limit > 0 ? <div className={styles.limit}>{nWords} words</div> : null}
        </div>
      ) : null}

      {errors && errors[stateKey] ? <ErrorMessage>{errors[stateKey]}</ErrorMessage> : null}
    </div>
  );
};

export default TextField;
export { TextFieldLabel };
