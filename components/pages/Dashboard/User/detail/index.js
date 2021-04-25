import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import { AuthContext } from "~context/auth";
import { fetcher } from "~utils/index";
import About from "./_components/About";
import Address from "./_components/Address";
import Avatar from "./_components/Avatar";
import IndustryExperiences from "./_components/IndustryExperiences";
import Language from "./_components/Language";
import Name from "./_components/Name";
import RecentFeedBack from "./_components/RecentFeedBack";
import WorkHistories from "./_components/WorkHistories";
import styles from "./index.module.scss";

const Base = ({ data }) => {
  const { auth } = useContext(AuthContext);
  const {
    id,
    work_histories,
    role,
    first_name,
    last_name,
    writerdetail,
    clientdetail,
    languages,
    rating,
    total_jobs,
  } = data;
  const isEdit = auth?.id === id;

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <div className={styles.flex}>
          <div className={styles.body}>
            <Avatar
              userId={id}
              oldAvatar={role === "client" ? clientdetail?.avatar : writerdetail?.avatar}
              isEdit={isEdit}
              role={auth?.role}
            />
            <Name
              first_name={first_name}
              last_name={last_name}
              isEdit={isEdit}
              role={auth?.role}
              userId={id}
            />
            <About
              about={role === "client" ? clientdetail?.about : writerdetail?.about}
              isEdit={isEdit}
              role={auth?.role}
              userId={id}
            />
            {!(isEdit && auth?.role === "client") && (
              <>
                <IndustryExperiences
                  industry_experiences={writerdetail?.industry_experiences}
                  isEdit={auth?.role === "writer"}
                  userId={id}
                />
                <WorkHistories work_histories={work_histories} isEdit={isEdit} userId={id} />
              </>
            )}
          </div>
          <div className={styles.wrapperSidebar}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarDivider} />
              <div className={styles.sidebarInfo}>
                <div className={styles.sidebarInfoItem}>
                  <div className={styles.sidebarInfoTitle}>Total Jobs</div>
                  <div className={styles.sidebarInfoValue}>{total_jobs}</div>
                </div>
                <div className={styles.sidebarInfoDivider} />
                <div className={styles.sidebarInfoItem}>
                  <div className={styles.sidebarInfoTitle}>Rating</div>
                  {rating !== 0 ? (
                    <div className={styles.sidebarInfoValue}>{rating}</div>
                  ) : (
                    <div className={styles.empty}>No rating yet</div>
                  )}
                </div>
              </div>
              {!(isEdit && auth?.role === "client") && (
                <Language languages={languages} isEdit={isEdit} userId={id} />
              )}
              <Address
                address={role === "client" ? clientdetail?.address : writerdetail?.address}
                isEdit={isEdit}
                userId={id}
                role={auth?.role}
              />
              <RecentFeedBack userId={id} role={role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDetail = () => {
  const router = useRouter();
  const userId = router.query.id;
  const { data } = useSWR(`/auth/profile/${userId}/`, fetcher);
  if (data === undefined) return <LoadingWrapper />;
  return <Base data={data} />;
};

export default UserDetail;
