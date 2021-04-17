import Button, { ButtonIcon } from "~components/elements/Button";
import NavLink from "~components/elements/NavLink";
import IconHome from "~components/svg/icon-home.svg";
import IconJob from "~components/svg/icon-job.svg";
import IconMenu from "~components/svg/icon-menu.svg";
import IconMessage from "~components/svg/icon-message.svg";
import styles from "./BottomNavbar.module.scss";

const BottomNavbarItem = ({ href, exact, children }) => (
  <div className={styles.itemWrapper}>
    <NavLink href={href} exact={exact} className={styles.item} activeClassName={styles.isActive}>
      <a>{children}</a>
    </NavLink>
  </div>
);

const BottomNavbar = ({ onClickHamburger }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <BottomNavbarItem href={`/dashboard`} exact={true}>
          <IconHome />
        </BottomNavbarItem>
        <BottomNavbarItem href={`/dashboard/job-feeds`}>
          <IconJob />
        </BottomNavbarItem>
        <BottomNavbarItem href={`/dashboard/messages`}>
          <IconMessage />
        </BottomNavbarItem>

        <div className={styles.itemWrapper}>
          <Button className={styles.item} type="fab" onClick={onClickHamburger}>
            <ButtonIcon svg={IconMenu} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
