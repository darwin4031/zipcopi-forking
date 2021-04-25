import enumDateRange from "./enumDateRange";
import FilterSelection from "./FilterSelection";
import FilterSelectionItem from "./FilterSelectionItem";
import FilterTitle from "./FilterTitle";

const FilterRange = ({ onChange, value, isLoading }) => {
  return (
    <div>
      <FilterTitle>Date Range</FilterTitle>
      <FilterSelection name="dateRange" value={value} onChange={onChange} isLoading={isLoading}>
        {Object.keys(enumDateRange).map((key) => (
          <FilterSelectionItem key={key} stateKey={key}>
            {enumDateRange[key]}
          </FilterSelectionItem>
        ))}
      </FilterSelection>
    </div>
  );
};

export default FilterRange;
