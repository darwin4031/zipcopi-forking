import getKey from "~utils/getKey";
import enumSortType from "./enumSortType";
import FilterOption from "./FilterOption";
import styles from "./FilterSort.module.scss";
import FilterTitle from "./FilterTitle";

const FilterSort = ({ onChange = (val) => {}, value, isLoading }) => {
  return (
    <div className={styles.Sort}>
      <FilterTitle>Sort By</FilterTitle>
      <div className={styles.SortOptions}>
        <FilterOption
          stateKey={getKey(enumSortType.startDate, enumSortType)}
          label="Start Date"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
        <FilterOption
          stateKey={getKey(enumSortType.deadline, enumSortType)}
          label="Deadline"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
        <FilterOption
          stateKey={getKey(enumSortType.jobName, enumSortType)}
          label="Job Name"
          onChange={onChange}
          currentState={value}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FilterSort;
