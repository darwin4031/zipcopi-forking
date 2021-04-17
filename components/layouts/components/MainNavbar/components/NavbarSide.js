import clsx from "clsx";
import { Children, cloneElement, useRef } from "react";
import { useClickAway } from "react-use";
import Button, { ButtonIcon } from "~components/elements/Button";
import IconClose from "~components/svg/icon-close.svg";
import NavbarLink from "./NavbarLink";
import styles from "./NavbarSide.module.scss";

const NavbarSide = ({ isOpen, onClose, children }) => {
  const wrapperRef = useRef();
  useClickAway(wrapperRef, () => (onClose ? onClose() : null));

  const childrenToRender = Children.map(children, (child, i) => {
    if (child.type === NavbarLink) {
      return cloneElement(child, {
        className: clsx(styles.link, child.props.className),
      });
    } else {
      return child;
    }
  });

  return (
    <div className={clsx(styles.el, isOpen && styles.isOpen)}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.header}>
          <Button type="fab" variant="primary" onClick={onClose}>
            <ButtonIcon svg={IconClose} />
          </Button>
        </div>
        {childrenToRender}
      </div>
    </div>
  );
};

export default NavbarSide;
