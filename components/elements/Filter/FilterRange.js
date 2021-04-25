import getKey from "~utils/getKey";
import enumSortType from "./enumDateRange";
import FilterOption from "./FilterOption";
import styles from "./FilterSort.module.scss";
import FilterTitle from "./FilterTitle";

const FilterSort = ({ onChange = (val) => {}, value, isLoading }) => {
  return (
    <div className={styles.Sort}>
      <FilterTitle>Date Range</FilterTitle>
      <div className={styles.SortOptions}>
        <FilterOption
          stateKey={getKey(enumSortType.lastWeek, enumSortType)}
          label="Last Week"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
        <FilterOption
          stateKey={getKey(enumSortType.thisMonth, enumSortType)}
          label="This Month"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
        <FilterOption
          stateKey={getKey(enumSortType.lastMonth, enumSortType)}
          label="Last Month"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
        <FilterOption
          stateKey={getKey(enumSortType.thisMonth, enumSortType)}
          label="This Month"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FilterSort;
