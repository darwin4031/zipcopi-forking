import { useState } from "react";
import Checkbox from "~components/elements/Checkbox";
import { H5 } from "~components/elements/Heading";
import TextField from "~components/elements/TextField";
import { premiumJob } from "~config/enums";
import styles from "./index.module.scss";

const wordCountOptions = [
  { label: "Less than 300", lowest: 0, highest: 300, value: 1 },
  { label: "300-500", lowest: 300, highest: 500, value: 2 },
  { label: "500-700", lowest: 500, highest: 700, value: 3 },
  { label: "700+", lowest: 700, highest: Infinity, value: 4 },
];

const JobFeedsSidebar = (props) => {
  const { filter, setFilter, jobTypeOptions } = props;
  const [wordCountOption, setWordCountOption] = useState(null);

  const onChangeCheckbox = (checked, id, key) => {
    if (checked) {
      const exists = filter[key].filter((item) => item === id).length > 0;
      if (!exists) {
        setFilter({
          [key]: [...filter[key], id],
        });
      }
    } else {
      setFilter({
        [key]: filter[key].filter((item) => item !== id),
      });
    }
  };

  const onChangePrice = (e, key) => {
    setFilter({ [key]: e });
  };

  const onChangeWordCount = (checked, value) => {
    if (checked) {
      setWordCountOption(value);
      const option = wordCountOptions.filter((item) => item.value === value)[0];
      setFilter({
        minWord: option.lowest,
        maxWord: option.highest !== Infinity ? option.highest : undefined,
      });
    } else {
      setWordCountOption(null);
      setFilter({
        minWord: undefined,
        maxWord: undefined,
      });
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarFilter}>
        <H5>Job Type</H5>
        <div className={styles.sidebarFilterOptions}>
          {jobTypeOptions.length > 0
            ? jobTypeOptions.map((type) => (
                <Checkbox
                  key={type.id}
                  className={styles.checkbox}
                  indicatorClassName={styles.checkboxIndicator}
                  checkSvgClassName={styles.checkboxSvg}
                  onChange={(checked) => onChangeCheckbox(checked, type.id, "type")}
                >
                  {type.name}
                </Checkbox>
              ))
            : null}
        </div>
      </div>
      <div className={styles.sidebarFilter}>
        <H5>Premium Type</H5>
        <div className={styles.sidebarFilterOptions}>
          {Object.keys(premiumJob).map((key) => (
            <Checkbox
              key={key}
              className={styles.checkbox}
              indicatorClassName={styles.checkboxIndicator}
              checkSvgClassName={styles.checkboxSvg}
              onChange={(checked) =>
                onChangeCheckbox(checked, premiumJob[key].value, "premiumJob")
              }
            >
              {premiumJob[key].display}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className={styles.sidebarFilter}>
        <H5>Word Count</H5>
        <div className={styles.sidebarFilterOptions}>
          {wordCountOptions.map((item) => (
            <Checkbox
              key={item.value}
              className={styles.checkbox}
              indicatorClassName={styles.checkboxIndicator}
              checkSvgClassName={styles.checkboxSvg}
              checked={item.value === wordCountOption}
              onChange={(checked) => onChangeWordCount(checked, item.value)}
            >
              {item.label}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className={styles.sidebarFilter}>
        <H5>Price</H5>
        <div className={styles.sidebarFilterPrices}>
          <TextField
            className={styles.sidebarFilterPrice}
            inputClassName={styles.textFieldInput}
            type="number"
            label="Minimum Price"
            placeholder="Min £"
            onChange={(e) => onChangePrice(e, "minPrice")}
          />
          <TextField
            className={styles.sidebarFilterPrice}
            inputClassName={styles.textFieldInput}
            type="number"
            label="Maximum Price"
            placeholder="Max £"
            onChange={(e) => onChangePrice(e, "maxPrice")}
          />
        </div>
      </div>
    </div>
  );
};

export default JobFeedsSidebar;
