import React, { useEffect, useState } from "react";
import DatePicker from "~components/elements/DatePicker";
import Filter from "~components/elements/Filter";
import IconSlider from "~components/svg/icon-slider.svg";

import styles from "./OrderHistory.module.scss";
import { H3 } from "~components/elements/Heading";
import Button from "~components/elements/Button";
import OrderHistoryTable from "./OrderHistoryTable";
import useProjectsListData from "./useProjectsListData";

function OrderHistory({}) {
  const [showFilters, setShowFilters] = useState(false);
  const [orders, setOrders] = useState([]);

  const { data, isLoading } = useProjectsListData();

  console.log("data", data);

  useEffect(() => {
    if (!!data) {
      setOrders(data.filter((job) => job.status === "completed"));
    }
  }, [data]);

  return (
    <section className={styles.orderHistoryContainer}>
      <div className={styles.topBar}>
        <H3 className={styles.title}>Order History</H3>
        <div className={styles.topBarActions}>
          <DatePicker
            value={null}
            value={new Date()}
            onChange={() => {}}
            placeholder={"Mar 1 - Apr 1"}
          />
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

      <OrderHistoryTable orders={orders} />

      <Filter isOpen={showFilters} onClose={() => setShowFilters(false)} />
    </section>
  );
}

export function getServerSideProps({}) {
  return {
    props: {},
  };
}

export default OrderHistory;
