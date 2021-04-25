import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import Button, { ButtonIcon } from "~components/elements/Button";
import IconClose from "~components/svg/icon-close.svg";
import getKey from "~utils/getKey";
import getTrueKeys from "~utils/getTrueKeys";
import routerQueryToObjectKeys from "~utils/routerQueryToObjectKey";
import enumSortType from "./enumSortType";
import styles from "./Filter.module.scss";
import FilterRange from "./FilterRange";
import FilterSort from "./FilterSort";
import FilterStatus from "./FilterStatus";
import FilterType from "./FilterType";

/**
 * Filter
 * @param {Object} props
 * @param {Boolean} props.isOpen
 * @param {Function} props.onClose
 */
const Filter = ({ isOpen, onClose = () => {} }) => {
  const router = useRouter();
  const role = router.query.role;

  const boxRef = useRef();
  useClickAway(boxRef, () => onClose());

  const initSortType = router.query.sortType || getKey(enumSortType.startDate, enumSortType);
  const [sortType, setSortType] = useState(initSortType);
  const onChangeSortType = (val) => setSortType(val);

  let initSelectedRange = routerQueryToObjectKeys(router.query.range);
  const [selectedRange, setSelectedRange] = useState(initSelectedRange);
  const onRangeChange = ({ newSelectedItems }) => {
    setSelectedRange(newSelectedItems);
  };

  let initSelectedType = routerQueryToObjectKeys(router.query.type);
  const [selectedType, setSelectedType] = useState(initSelectedType);
  const onTypeChange = ({ newSelectedItems }) => {
    setSelectedType(newSelectedItems);
  };

  let initSelectedStatus = routerQueryToObjectKeys(router.query.status);
  const [selectedStatus, setSelectedStatus] = useState(initSelectedStatus);
  const onStatusChange = ({ newSelectedItems }) => {
    setSelectedStatus(newSelectedItems);
  };

  const [isLoading, setLoading] = useState(false);
  const onSubmit = () => {
    const data = {
      sortType: sortType,
      range: getTrueKeys(selectedRange),
      type: getTrueKeys(selectedType),
      status: getTrueKeys(selectedStatus),
    };

    //--prod console.log({ data });
    setLoading(true);

    router.push({ pathname: `/${role}/dashboard`, query: data }).then(() => {
      onClose();
      setLoading(false);
    });
  };

  useEffect(() => {
    // Reset all the filter on cancel / on filter close
    setSortType(initSortType);
    setSelectedRange(initSelectedRange);
    setSelectedType(initSelectedType);
    setSelectedStatus(initSelectedStatus);
  }, [isOpen]);

  return (
    <div className={clsx(styles.Filter, isOpen && styles.isOpen)}>
      <div ref={boxRef} className={styles.FilterBox}>
        <div className={styles.FilterHeader}>
          <div className={styles.FilterTitle}>Filters</div>
          <div className={styles.FilterClose}>
            <Button
              className={styles.FilterCloseButton}
              variant="primary"
              type="fab"
              onClick={onClose}
            >
              <ButtonIcon svg={IconClose} />
            </Button>
          </div>
        </div>

        <div className={styles.FilterBody}>
          <FilterSort value={sortType} onChange={onChangeSortType} isLoading={isLoading} />
          <FilterRange value={selectedRange} onChange={onRangeChange} isLoading={isLoading} />
          <FilterType value={selectedType} onChange={onTypeChange} isLoading={isLoading} />
          <FilterStatus value={selectedStatus} onChange={onStatusChange} isLoading={isLoading} />
          <div className={styles.FilterSubmitWrapper}>
            <Button
              className={styles.FilterSubmit}
              variant="primary"
              label="Apply"
              isLoading={isLoading}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
