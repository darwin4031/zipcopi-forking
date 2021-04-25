import FilterSelection from "./FilterSelection";
import FilterSelectionItem from "./FilterSelectionItem";
import FilterTitle from "./FilterTitle";

const FilterType = ({ onChange, value, isLoading, jobTypeOptions }) => {
  return (
    <div>
      <FilterTitle>Type</FilterTitle>
      <FilterSelection name="dateRange" value={value} onChange={onChange} isLoading={isLoading}>
        {jobTypeOptions.map((type) => (
          <FilterSelectionItem key={type.id} stateKey={type.id}>
            {type.name}
          </FilterSelectionItem>
        ))}
      </FilterSelection>
    </div>
  );
};

export default FilterType;
