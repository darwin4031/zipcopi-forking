import enumProjectType from "./enumProjectType";
import FilterSelection from "./FilterSelection";
import FilterSelectionItem from "./FilterSelectionItem";
import FilterTitle from "./FilterTitle";

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
