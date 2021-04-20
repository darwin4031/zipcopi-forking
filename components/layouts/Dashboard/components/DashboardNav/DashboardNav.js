import clsx from "clsx";
import { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import Brand from "~components/layouts/components/Brand";
import IconHome from "~components/svg/icon-home.svg";
import IconJob from "~components/svg/icon-job.svg";
import IconMessage from "~components/svg/icon-message.svg";
import IconProfileCompletion from "~components/svg/icon-profile-completion.svg";
import IconSettings from "~components/svg/icon-settings.svg";
import { AuthContext } from "~context/auth";
import checkActiveUrl from "~utils/checkActiveUrl";
import styles from "./DashboardNav.module.scss";
import DashboardNavMenu from "./DashboardNavMenu";
import DashboardNavProfile from "./DashboardNavProfile";

const DashboardNav = ({ isOpen, onClose = () => {} }) => {
  const { auth } = useContext(AuthContext);
  const isRoleWriter = auth?.role === "writer";
  const isRoleClient = auth?.role === "client";

  const isJobUrl = checkActiveUrl({ href: "/dashboard/jobs/" });

  const boxRef = useRef();
  useClickAway(boxRef, () => onClose());

  return (
    <div className={clsx(styles.DashboardNav, isOpen && styles.isOpen)}>
      <div ref={boxRef} className={styles.DashboardNavBox}>
        <div className={styles.DashboardNavHeader}>
          <div className={styles.DashboardNavBrandWrapper}>
            <Brand svgClassName={styles.DashboardNavBrand} />
          </div>
        </div>

        <div className={styles.DashboardNavBody}>
          <div className={styles.DashboardNavMenuWrapper}>
            {isRoleWriter && !auth?.writerdetail?.is_verfied ? (
              <DashboardNavMenu
                href="dashboard/profile-completion"
                icon={IconProfileCompletion}
                label="Complete Profile"
                exact={true}
                onClick={onClose}
              />
            ) : null}

            <DashboardNavMenu
              href="/dashboard"
              icon={IconHome}
              label="Dashboard"
              exact={true}
              onClick={onClose}
            />

            {isRoleClient ? (
              <DashboardNavMenu
                href="/dashboard/jobs/in-progress"
                icon={IconJob}
                label="Jobs"
                withActiveIndicator={false}
                onClick={onClose}
                exact={true}
              />
            ) : (
              <DashboardNavMenu
                href="/dashboard/jobs/feeds"
                icon={IconJob}
                label="Jobs"
                withActiveIndicator={false}
                onClick={onClose}
                exact={true}
              />
            )}

            {isJobUrl ? (
              <div className={styles.jobGroup}>
                {isRoleClient ? (
                  <>
                    <DashboardNavMenu
                      href="/dashboard/jobs/create"
                      label="Add New"
                      onClick={onClose}
                      exact={true}
                    />
                    <DashboardNavMenu
                      href="/dashboard/jobs/drafts"
                      label="Drafts"
                      onClick={onClose}
                      exact={true}
                    />
                  </>
                ) : (
                  <DashboardNavMenu
                    href="/dashboard/jobs/feeds"
                    label="Feed"
                    onClick={onClose}
                    exact={true}
                  />
                )}

                <DashboardNavMenu
                  href="/dashboard/jobs/in-progress"
                  label="In progress"
                  onClick={onClose}
                  exact={true}
                />

                {/* <DashboardNavMenu
                  href="/my-job/pending-feedback"
                  label="Pending Feedbacks"
                  onClick={onClose}
                  exact={true}
                /> */}

                {/* {isRoleClient ? (
                  <DashboardNavMenu
                    href="/my-job/pending-draft"
                    label="Draft"
                    onClick={onClose}
                    exact={true}
                  />
                ) : null} */}
              </div>
            ) : null}

            <DashboardNavMenu
              href="/dashboard/messages"
              icon={IconMessage}
              label="Message"
              // notifications={2}
              onClick={onClose}
            />

            {isRoleClient ? (
              <>
                <DashboardNavMenu
                  href="/dashboard/order-history"
                  icon={IconJob}
                  label="Order History"
                  onClick={onClose}
                />
                <DashboardNavMenu
                  href="/dashboard/billing-history"
                  icon={IconJob}
                  label="Billing History"
                  onClick={onClose}
                />
              </>
            ) : null}

            <DashboardNavMenu
              href="/dashboard/settings"
              icon={IconSettings}
              label="Settings"
              onClick={onClose}
            />
          </div>

          <DashboardNavProfile />
        </div>

        {/* Temporary disabled according to newest design */}
        {/* <div className={styles.DashboardNavFooter}>
          <IllustrationDotsPattern className={styles.DashboardNavPattern} />
          <DashboardNavPromo />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardNav;
