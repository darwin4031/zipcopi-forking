import NavLink from "~components/elements/NavLink";
import styles from "./DashboardNavMenu.module.scss";

const DashboardNavMenu = ({
  href,
  icon,
  label,
  exact,
  notifications,
  withActiveIndicator = true,
  onClick,
}) => {
  const Icon = icon;

  return (
    <NavLink
      href={href}
      className={styles.Menu}
      activeClassName={withActiveIndicator ? styles.isActive : null}
      exact={exact}
    >
      <a onClick={onClick}>
        <div className={styles.MenuWrapper}>
          <div className={styles.MenuIcon}>
            {Icon ? <Icon className={styles.MenuSvg} /> : null}
          </div>
          <div className={styles.MenuLabel}>{label}</div>
        </div>

        {notifications ? <div className={styles.MenuNotifications}>{notifications}</div> : null}
      </a>
    </NavLink>
  );
};

export default DashboardNavMenu;
