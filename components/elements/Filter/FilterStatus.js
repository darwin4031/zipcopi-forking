import FilterTitle from "./FilterTitle";
import FilterSelection from "./FilterSelection";
import FilterSelectionItem from "./FilterSelectionItem";
import enumProjectStatus from "./enumProjectStatus";

const FilterStatus = ({ onChange, value, isLoading }) => {
  return (
    <div>
      <FilterTitle>Status</FilterTitle>
      <FilterSelection name="dateRange" value={value} onChange={onChange} isLoading={isLoading}>
        {Object.keys(enumProjectStatus).map((key) => (
          <FilterSelectionItem key={key} stateKey={key}>
            {enumProjectStatus[key]}
          </FilterSelectionItem>
        ))}
      </FilterSelection>
    </div>
  );
};

export default FilterStatus;
