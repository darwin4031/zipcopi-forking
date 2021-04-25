import { Children, cloneElement } from "react";
import getTrueKeys from "~utils/getTrueKeys";
import styles from "./FilterSelection.module.scss";
import FilterSelectionItem from "./FilterSelectionItem";

const FilterSelection = ({
  name,
  onChange: propOnChange = ({ updated: { key, isSelected }, newSelectedItems, activeKeys }) => {},
  value: propValue,
  isLoading,
  children,
}) => {
  const handleChange = ({ key, isSelected }) => {
    if (isLoading) return false;

    const newSelectedItems = { ...propValue, [key]: isSelected };
    const activeKeys = getTrueKeys(newSelectedItems);

    propOnChange({
      updated: { key, isSelected },
      newSelectedItems,
      activeKeys,
    });
  };

  const childrenRender = Children.map(children, (child) => {
    if (child.type === FilterSelectionItem) {
      return cloneElement(child, {
        onChange: (e) => {
          return handleChange({
            key: child.props.stateKey,
            isSelected: e.target.checked,
          });
        },
        name: name,
        isSelected: propValue?.[child.props.stateKey] || false,
        isLoading: isLoading,
      });
    }
  });

  return <div className={styles.FilterSelection}>{childrenRender}</div>;
};

export default FilterSelection;
