import React, { useContext } from "react";
import useSWR from "swr";
import Button from "~components/elements/Button";
import DatePicker from "~components/elements/DatePicker";
import Filter from "~components/elements/Filter";
import { H3 } from "~components/elements/Heading";
import IconSlider from "~components/svg/icon-slider.svg";
import { AuthContext } from "~context/auth";
import useObjectState from "~hooks/useObjectState";
import useOpen from "~hooks/useOpen";
import { fetcher, maybe } from "~utils/index";
import LoadingWrapper from "../../../elements/LoadingWrapper";
import TextField from "@material-ui/core/TextField";

import styles from "./OrderHistory.module.scss";
import OrderHistoryTable from "./OrderHistoryTable";

const Base = ({ jobTypeOptions }) => {
  const { auth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useOpen();
  const [filters, setFilters] = useObjectState({
    ordering: undefined,
    created__at: "",
    created__gte: "",
    created__lte: "",
    status__in: [],
    type__in: [],
  });
  console.log(filters);
  const { data: rawData, mutate } = useSWR(
    [
      `/${auth.role}s/${auth.id}/jobs/`,
      filters.ordering,
      filters.created__at,
      filters.created__gte,
      filters.created__lte,
      filters.status__in.join(","),
      filters.type__in.join(","),
    ],
    (url, ordering, created__at, created__gte, created__lte, status__in, type__in) => {
      const params = {
        ordering: ordering,
      };

      if (created__at) {
        params.created__at = created__at;
      }
      if (created__gte) {
        params.created__gte = created__gte;
      }
      if (created__lte) {
        params.created__lte = created__lte;
      }
      if (status__in) {
        params.status__in = status__in;
      }
      if (type__in) {
        params.type__in = type__in;
      }
      return fetcher(url, { params });
    }
  );
  const data = maybe(() => rawData.results, []);

  return (
    <section className={styles.orderHistoryContainer}>
      <div className={styles.topBar}>
        <H3 className={styles.title}>Order History</H3>
        <div className={styles.topBarActions}>
          <TextField
            id="date"
            label="Created at"
            type="date"
            onChange={(e) => {
              setFilters({ created__at: e.target.value });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button className={styles.filterButton} variant="secondary" onClick={onOpen}>
            <IconSlider className={styles.filterButtonIcon} />
            Filters
          </Button>
        </div>
      </div>
      <OrderHistoryTable orders={data} />
      <Filter
        isOpen={isOpen}
        onClose={onClose}
        jobTypeOptions={jobTypeOptions}
        filters={filters}
        setFilters={setFilters}
      />
    </section>
  );
};

const OrderHistory = () => {
  const { data: typeData } = useSWR("/jobs/types/", fetcher);
  const jobTypeOptions = maybe(() => typeData.results, []);
  if (!typeData) return <LoadingWrapper />;
  return <Base jobTypeOptions={jobTypeOptions} />;
};

export default OrderHistory;
