import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import IconVerifyBadge from "~components/svg/icon-verify-badge.svg";
import Stars from "~components/elements/Stars";
import clsx from "clsx";
import { useRouter } from "next/router";
import { AuthContext } from "~context/auth";
import axios from "axios";
import useJobPropertiesData from "./hooks/useJobPropertiesData";
import useUserProfile from "./hooks/useUserProfile";
import About from "./About";
import Name from "./Name/Name";
import IndustryExperiences from "./IndustryExperiences/IndustryExperiences";
import WorkHistories from "./WorkHistories/WorkHistories";
import Avatar from "./Avatar/Avatar";
import Address from "./Address/Address";
import Language from "./Language/Language";
import GeneralLink from "~components/elements/GeneralLink";

const Feedbacks = ({ ratesData }) => {
  return (
    <div className={styles.sidebarFeedbacks}>
      <div className={styles.sidebarFeedbacksTitle}>Recent Feedbacks</div>
      {ratesData && ratesData.length ? (
        ratesData.map((rating, i) => (
          <div key={i} className={styles.feedback}>
            <div className={styles.feedbackMiddle}>
              <Stars rate={rating.rate} />
            </div>
            <div className={styles.feedbackContent}>{rating.note}</div>
          </div>
        ))
      ) : (
        <div className={clsx(styles.empty, styles.sidebarFeedbacksEmpty)}>
          There's no feedback yet for this user
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isRoleWriter, data, isMine, fetchData }) => {
  const isEmailVerified = data.is_verified;

  const router = useRouter();
  const {
    data: ratesData,
    isFetching: isFetchingRatesData,
    fetchData: fetchDataRatesData,
  } = useRatesData(router.query.id, data?.role);

  const fallbackSumRates = { rate: 0, totalUser: 0 };

  const sumRates = ratesData
    ? ratesData.reduce(
        (prev, x) => ({
          rate: prev.rate + x.rate,
          totalUser: prev.totalUser + 1,
        }),
        fallbackSumRates
      )
    : fallbackSumRates;

  const averageRate =
    sumRates.rate && sumRates.totalUser ? (sumRates.rate / sumRates.totalUser).toFixed(1) : null;

  return isFetchingRatesData ? (
    <div style={{ position: "relative", height: "100px" }}>
      <WholeLoading />
    </div>
  ) : (
    <div className={styles.sidebar}>
      {/* Hire and report button */}
      {/* {isRoleWriter ? (
        <div className={styles.sidebarActions}>
          <Button
            className={styles.sidebarActionsHire}
            label="Hire writer"
            variant="primary"
          />
          <Button
            className={clsx(
              styles.sidebarActionsHire,
              styles.sidebarActionsReport,
            )}
            label="Report writer"
          />
        </div>
      ) : null} */}

      {/* Job information */}
      <div className={styles.sidebarDivider}></div>
      <div className={styles.sidebarInfo}>
        <div className={styles.sidebarInfoItem}>
          <div className={styles.sidebarInfoTitle}>Total Jobs</div>
          <div className={styles.sidebarInfoValue}>{sumRates.totalUser}</div>
        </div>

        {/* Earning */}
        {/* <div className={styles.sidebarInfoDivider}></div>
            <div className={styles.sidebarInfoItem}>
              <div className={styles.sidebarInfoTitle}>Total Earnings</div>
              <div className={styles.sidebarInfoValue}>£900</div>
            </div> */}

        <div className={styles.sidebarInfoDivider}></div>
        <div className={styles.sidebarInfoItem}>
          <div className={styles.sidebarInfoTitle}>Rating</div>
          {averageRate ? (
            <div className={styles.sidebarInfoValue}>{averageRate}</div>
          ) : (
            <div className={styles.empty}>No information</div>
          )}
        </div>
      </div>

      {/* Email Verification */}
      <div className={clsx(styles.sidebarStatus, styles.sidebarEmail)}>
        {isEmailVerified ? (
          <div className={styles.sidebarEmailTitle}>
            Email Verified
            <IconVerifyBadge className={styles.sidebarEmailSvg} />
          </div>
        ) : (
          <>
            <div className={styles.sidebarEmailTitle}>Email hasn't been verified</div>
            {isMine ? (
              <GeneralLink
                className={styles.sidebarEmailAction}
                href={`/verify?email=${encodeURIComponent(data.email)}`}
              >
                Verify Now
              </GeneralLink>
            ) : null}
          </>
        )}
      </div>

      {/* Languages */}
      {isRoleWriter ? <Language data={data} isMine={isMine} fetchData={fetchData} /> : null}

      {/* Payment Verification */}
      {/* {isRoleClient ? (
        <div className={clsx(styles.sidebarStatus, styles.sidebarPayment)}>
          <div className={styles.sidebarStatusTitle}>Payment Not Verified</div>
          {isMine ? (
            <GeneralLink
              className={styles.sidebarPaymentAction}
              href="/payment-verification"
            >
              Verify Now
            </GeneralLink>
          ) : null}
        </div>
      ) : null} */}

      {/* Address Information */}
      <Address data={data} isMine={isMine} fetchData={fetchData} />
      {/* <div className={styles.sidebarAddress}>
        <div className={styles.sidebarAddressTitle}>Address</div>
        {userData.detail?.address && userData.detail?.address?.length > 0 ? (
          <div className={styles.sidebarAddressContent}>
            {userData.detail.address}
          </div>
        ) : (
          <div className={styles.empty}>No information</div>
        )}
      </div> */}

      {/* Recent Feedbacks */}
      <Feedbacks ratesData={ratesData} isMine={isMine} />
    </div>
  );
};

const Profile = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const isMine = auth.user_id == router.query.id;
  const { data, isFetching, fetchData } = useUserProfile(router.query.id);
  const { isLoading, premiumJobs, jobTypes } = useJobPropertiesData();
  const isRoleClient = data?.role === enumRoles.client;
  const isRoleWriter = data?.role === enumRoles.writer;

  return isFetching || isLoading ? (
    <LoadingWrapper>
      <WholeLoading />
    </LoadingWrapper>
  ) : (
    <div className={styles.root}>
      <div className={styles.box}>
        <div className={styles.flex}>
          <div className={styles.body}>
            {/* Avatar */}
            <Avatar data={data} isMine={isMine} fetchData={fetchData} />

            {/* Name */}
            <Name data={data} isMine={isMine} fetchData={fetchData} />

            {/* {data.detail?.address ? (
              <div className={styles.location}>{data.detail.address}</div>
            ) : null} */}

            {/* Total jobs & spending */}
            {/* {isRoleClient ? (
              <div className={clsx(styles.sidebarInfo, styles.clientInfo)}>
                <div className={styles.sidebarInfoItem}>
                  <div className={styles.sidebarInfoTitle}>Total Jobs</div>
                  <div className={styles.sidebarInfoValue}>4</div>
                </div>
                <div className={styles.sidebarInfoDivider}></div>
                <div className={styles.sidebarInfoItem}>
                  <div className={styles.sidebarInfoTitle}>Total Spending</div>
                  <div className={styles.sidebarInfoValue}>£900</div>
                </div>
              </div>
            ) : null} */}

            {/* About */}
            <About data={data} isMine={isMine} fetchData={fetchData} />

            {/* Industry Experiences */}
            {isRoleWriter ? (
              <IndustryExperiences data={data} isMine={isMine} fetchData={fetchData} />
            ) : null}

            {isRoleWriter ? (
              <WorkHistories data={data} isMine={isMine} fetchData={fetchData} />
            ) : null}
          </div>
          <div className={styles.wrapperSidebar}>
            <Sidebar
              isRoleClient={isRoleClient}
              isRoleWriter={isRoleWriter}
              data={data}
              isMine={isMine}
              fetchData={fetchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function useRatesData(userId, role) {
  const [data, setData] = useState();
  const [isFetching, setFetching] = useState(true);

  const fetchData = () => {
    const _role = role === "client" ? "clients" : "writers";
    axios
      .get(`/${_role}/${userId}/rates`)
      .then((res) => {
        //--prod console.log("useRatesData", { res });
        setData(res.data.results);
        setFetching(false);
      })
      .catch((err) => {
        console.error("useRatesData", { err });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isFetching, fetchData };
}

export default Profile;
