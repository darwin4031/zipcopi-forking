import FilterTitle from "./FilterTitle";
import FilterSelection from "./FilterSelection";
import FilterSelectionItem from "./FilterSelectionItem";
import enumProjectType from "./enumProjectType";

const FilterType = ({ onChange, value, isLoading }) => {
  return (
    <div>
      <FilterTitle>Type</FilterTitle>
      <FilterSelection name="dateRange" value={value} onChange={onChange} isLoading={isLoading}>
        {Object.keys(enumProjectType).map((key) => (
          <FilterSelectionItem key={key} stateKey={key}>
            {enumProjectType[key]}
          </FilterSelectionItem>
        ))}
      </FilterSelection>
    </div>
  );
};

export default FilterType;
