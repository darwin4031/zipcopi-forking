import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "~context/auth";
import styles from "./DashboardNavProfile.module.scss";

const DashboardNavProfile = () => {
  const { auth } = useContext(AuthContext);
  let avatar = "/img/default-avatar.png";
  if (auth !== undefined) {
    if (auth?.role === "client") {
      avatar = auth?.clientdetail?.avatar || avatar;
    } else if (auth?.role === "writer") {
      avatar = auth?.writerdetail?.avatar || avatar;
    }
  }

  return auth ? (
    <Link href={`/dashboard/user/${auth?.id}`}>
      <a className={styles.root}>
        <div className={styles.Profile}>
          <div className={styles.ProfileAvatar}>
            <img src={avatar} alt="User avatar" />
          </div>
          <div className={styles.ProfileInfo}>
            <div className={styles.ProfileName}>
              {auth?.first_name} {auth?.last_name}
            </div>
            <div className={styles.ProfileEmail}>{auth?.email}</div>
          </div>
        </div>
      </a>
    </Link>
  ) : null;
};

export default DashboardNavProfile;
