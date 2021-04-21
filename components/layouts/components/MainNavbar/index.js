import clsx from "clsx";
import { useState } from "react";
import Button, { ButtonIcon } from "~components/elements/Button";
import LinkedButton from "~components/elements/LinkedButton";

import IconMenu from "~components/svg/icon-menu.svg";
import Brand from "../Brand";
import NavbarLink from "./components/NavbarLink";
import NavbarSide from "./components/NavbarSide";
import styles from "./index.module.scss";

const Navbar = ({ className }) => {
  const [isSideOpen, setSideOpen] = useState(false);
  const onOpenSide = () => setSideOpen(true);
  const onCloseSide = () => setSideOpen(false);

  return (
    <>
      <div className={clsx(styles.Navbar, className)}>
        <div className="container">
          <div className={styles.NavbarFlex}>
            <div className={styles.NavbarBump} />
            <Brand />

            <div className={styles.LinkWrapper}>
              <NavbarLink href="/">Home</NavbarLink>
              <NavbarLink href="/service">Service</NavbarLink>
              <NavbarLink href="/pricing">Pricing</NavbarLink>
              <NavbarLink href="/about">About</NavbarLink>
              <NavbarLink href="/contact">Contact</NavbarLink>
              <NavbarLink href="/blogs">Blogs</NavbarLink>
            </div>

            <div className={styles.ButtonWrapper}>
              <div className={styles.ButtonCol}>
                <LinkedButton href="/signin" label="Sign In" />
              </div>
              <div className={styles.ButtonCol}>
                <LinkedButton href="/signup" label="Sign Up" variant="primary" />
              </div>
            </div>

            <div className={styles.NavbarBump}>
              <Button type="fab" className={styles.NavbarToggler} onClick={onOpenSide}>
                <ButtonIcon svg={IconMenu} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NavbarSide isOpen={isSideOpen} onOpen={onOpenSide} onClose={onCloseSide}>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/service">Service</NavbarLink>
        <NavbarLink href="/pricing">Pricing</NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/contact">Contact</NavbarLink>
        <NavbarLink href="/signin">Signin</NavbarLink>
        <NavbarLink href="/signup">Signup</NavbarLink>
      </NavbarSide>
    </>
  );
};

export default Navbar;
