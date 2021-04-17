import clsx from "clsx";
import IconLoading from "~components/svg/icon-loading.svg";
import styles from "./index.module.scss";

const ButtonText = ({ className, children }) => {
  return <span className={clsx(styles.ButtonText, className)}>{children}</span>;
};

const ButtonIcon = ({ svg, className }) => {
  const TagSvg = svg;
  return <TagSvg className={clsx(styles.ButtonSvg, className)} />;
};

const ButtonLoader = () => {
  return (
    <div className={styles.ButtonLoader}>
      <div className={styles.ButtonLoaderSpin}>
        <IconLoading className={styles.ButtonLoaderSvg} />
      </div>
    </div>
  );
};

const Button = ({
  className,
  type,
  variant,
  label,
  isLoading,
  onClick,
  children,
  nativeProps,
  ...props
}) => {
  return (
    <button
      {...nativeProps}
      {...props}
      disabled={isLoading}
      className={clsx(
        styles.Button,
        styles[`variant-${variant}`],
        styles[`type-${type}`],
        isLoading && styles.isLoading,
        className
      )}
      onClick={onClick}
    >
      {children ? children : <ButtonText>{label}</ButtonText>}
      <ButtonLoader />
    </button>
  );
};

export default Button;
export { ButtonText, ButtonIcon, Button };
