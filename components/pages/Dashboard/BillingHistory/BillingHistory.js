import React, { useState } from "react";
import Button from "~components/elements/Button";
import DatePicker from "~components/elements/DatePicker";
import Filter from "~components/elements/Filter";
import { H3 } from "~components/elements/Heading";
import IconSlider from "~components/svg/icon-slider.svg";
import { maybe } from "~utils/index";

import styles from "./BillingHistory.module.scss";
import BillingHistoryTable from "./BillingHistoryTable";
import useBillingHistories from "./useBillingHistories";

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
