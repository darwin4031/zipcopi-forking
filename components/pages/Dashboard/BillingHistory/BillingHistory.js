import React, { useEffect, useState } from "react";
import DatePicker from "~components/elements/DatePicker";
import Button from "~components/elements/Button";
import { H3 } from "~components/elements/Heading";
import Filter from "~components/elements/Filter";
import IconSlider from "~components/svg/icon-slider.svg";
import { maybe } from "~utils/index";
import useBillingHistories from "./useBillingHistories";

import styles from "./BillingHistory.module.scss";
import BillingHistoryTable from "./BillingHistoryTable";

function BillingHistory({}) {
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading } = useBillingHistories();
  const bills = maybe(() => data, []);

  return (
    <section className={styles.billingHistoryContainer}>
      <div className={styles.topBar}>
        <H3 className={styles.title}>Billing History</H3>
        <div className={styles.topBarActions}>
          <DatePicker value={new Date()} onChange={() => {}} placeholder={"Mar 1 - Apr 1"} />
          <Button
            className={styles.filterButton}
            variant="secondary"
            onClick={() => setShowFilters(true)}
          >
            <IconSlider className={styles.filterButtonIcon} />
            Filters
          </Button>
        </div>
      </div>

      <BillingHistoryTable bills={bills} />

      <Filter isOpen={showFilters} onClose={() => setShowFilters(false)} />
    </section>
  );
}

export function getServerSideProps({}) {
  return {
    props: {},
  };
}

export default BillingHistory;
