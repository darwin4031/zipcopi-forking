import clsx from "clsx";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import Button, { ButtonIcon } from "~components/elements/Button";
import IconClose from "~components/svg/icon-close.svg";
import getTrueKeys from "~utils/getTrueKeys";
import styles from "./Filter.module.scss";
import FilterSort from "./FilterSort";
import FilterStatus from "./FilterStatus";
import FilterType from "./FilterType";

/**
 * Filter
 * @param {Object} props
 * @param {Boolean} props.isOpen
 * @param {Function} props.onClose
 */
const Filter = ({ isOpen, onClose, filters, setFilters, jobTypeOptions }) => {
  const boxRef = useRef();
  useClickAway(boxRef, () => onClose());

  const [sortType, setSortType] = useState(filters.ordering);
  const onChangeSortType = (val) => setSortType(val);

  const [selectedType, setSelectedType] = useState(filters.type__in);
  const onTypeChange = ({ newSelectedItems }) => {
    setSelectedType(newSelectedItems);
  };

  const [selectedStatus, setSelectedStatus] = useState(filters.status__in);
  const onStatusChange = ({ newSelectedItems }) => {
    setSelectedStatus(newSelectedItems);
  };

  const [isLoading, setLoading] = useState(false);
  const onSubmit = () => {
    const data = {
      ordering: sortType,
      type__in: getTrueKeys(selectedType),
      status__in: getTrueKeys(selectedStatus),
    };
    setFilters(data);
  };

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
          <FilterType
            value={selectedType}
            onChange={onTypeChange}
            isLoading={isLoading}
            jobTypeOptions={jobTypeOptions}
          />
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
