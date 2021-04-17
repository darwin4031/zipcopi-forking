import clsx from "clsx";
import { useRef } from "react";
import { useClickAway } from "react-use";
import ClientOnlyPortal from "~components/elements/ClientOnlyPortal";
import styles from "./index.module.scss";

const Popup = ({
  children,
  className,
  classNameBox,
  classNameScroller,
  isOpen = false,
  onClose = () => {},
}) => {
  const cn = clsx(styles.root, isOpen && styles.isOpen, className);
  const cnBox = clsx(styles.box, classNameBox);
  const cnScroller = clsx(styles.scroller, classNameScroller);
  const boxRef = useRef();

  useClickAway(boxRef, () => {
    if (isOpen) onClose();
  });

  return (
    <ClientOnlyPortal selector="#modalRoot">
      <div className={cn}>
        <div className={cnScroller}>
          <div className={styles.flex}>
            <div className={styles.inner}>
              <div ref={boxRef} className={cnBox}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};

export default Popup;
