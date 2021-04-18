import React, { useState } from "react";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import DashboardNav from "./components/DashboardNav/DashboardNav";
import DashboardSearchbar from "./components/DashboardSearchbar/DashboardSearchbar";

import styles from "./index.module.scss";

const DashboardLayout = ({ children }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const onOpenNav = () => setNavOpen(true);
  const onCloseNav = () => setNavOpen(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const onOpenFilter = () => setFilterOpen(true);
  const onCloseFilter = () => setFilterOpen(false);

  return (
    <div className={styles.Dashboard}>
      <DashboardNav isOpen={isNavOpen} onClose={onCloseNav} />
      <BottomNavbar onClickHamburger={onOpenNav} />
      <DashboardSearchbar onClickHamburger={onOpenNav} onClickFilter={onOpenFilter} />
      <div className={styles.DashboardBody}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
