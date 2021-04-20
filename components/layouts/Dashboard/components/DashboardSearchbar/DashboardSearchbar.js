import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Button, { ButtonIcon } from "~components/elements/Button";
import ConfirmationPopup from "~components/elements/ConfirmationPopup";
import Brand from "~components/layouts/components/Brand";
import IconChevronLeft from "~components/svg/icon-chevron-left.svg";
import IconLogout from "~components/svg/icon-logout.svg";
import IconMenu from "~components/svg/icon-menu.svg";
import { AuthContext } from "~context/auth";
import checkActiveUrl from "~utils/checkActiveUrl";
import styles from "./DashboardSearchbar.module.scss";
import DashboardSearchbarSearch from "./DashboardSearchbarSearch";

const DashboardSearchbar = ({ withFilter, onClickHamburger, onClickFilter }) => {
  const [isPopupLogout, setPopupLogout] = useState(false);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { setAuth } = useContext(AuthContext);

  const hasMessageId = typeof id !== "undefined";
  const isPageMessage = checkActiveUrl({
    href: `/message`,
  });
  const withMessageBackBtn = isPageMessage && hasMessageId;

  const onBackMessage = () => {
    router.push(`/message`);
  };

  const onClickLogout = () => {
    setPopupLogout(true);
  };

  const onCancelLogout = () => {
    setPopupLogout(false);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setLoggingOut(false);
    setPopupLogout(false);
    setAuth(undefined);
    router.push("/signin");
  };

  return (
    <div
      className={clsx(
        styles.Searchbar,
        withMessageBackBtn && styles.withMessageBackBtn,
        withFilter && styles.withFilter
      )}
    >
      <div className={styles.SearchbarBump}>
        <Button className={styles.SearchbarBackBtn} type="fab" onClick={onBackMessage}>
          <ButtonIcon svg={IconChevronLeft} />
        </Button>
        <Button className={styles.SearchbarHamburger} type="fab" onClick={onClickHamburger}>
          <ButtonIcon svg={IconMenu} />
        </Button>
      </div>
      <div className={styles.SearchbarBrand}>
        <Brand />
      </div>
      <div className={styles.SearchbarWrapper}>
        <div className={styles.SearchbarSearch}>
          <DashboardSearchbarSearch />
        </div>
        <div className={clsx(styles.SearchbarAction, withFilter && styles.withFilter)}>
          {/* {withFilter ? (
            <Button
              className={styles.SearchbarButton}
              variant="primary"
              type="fab"
              onClick={onClickFilter}
            >
              <ButtonIcon svg={IconFilter} />
            </Button>
          ) : null} */}

          <Button
            className={styles.SearchbarButton}
            variant="primary"
            type="fab"
            onClick={onClickLogout}
            isLoading={isLoggingOut}
          >
            <ButtonIcon svg={IconLogout} />
          </Button>
        </div>
      </div>

      <ConfirmationPopup
        title="Logout"
        content="Are you sure you want to logout?"
        submitText="Yes"
        cancelText="Cancel"
        isOpen={isPopupLogout}
        onSubmit={onLogout}
        onCancel={onCancelLogout}
      />
    </div>
  );
};

export default DashboardSearchbar;
