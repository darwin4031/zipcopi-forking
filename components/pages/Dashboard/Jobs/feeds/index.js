import React from "react";
import useSWR from "swr";
import Button, { ButtonIcon } from "~components/elements/Button";
import { H3 } from "~components/elements/Heading";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import IconReload from "~components/svg/icon-reload.svg";
import useObjectState from "~hooks/useObjectState";
import { fetcher, maybe } from "~utils/index";
import GreenSelectBox from "./_components/GreenSelectBox";
import JobFeedsItem from "./_components/JobFeedsItem";
import JobFeedsSidebar from "./_components/JobFeedsSidebar";
import styles from "./index.module.scss";

const sortOptions = [
  { label: "Posted", value: "created_at" },
  { label: "Deadline", value: "deadline_date" },
];

const Base = ({ jobTypeOptions }) => {
  const [filter, setFilter] = useObjectState({
    sortBy: "created_at",
    premiumJob: [],
    type: [],
    minWord: undefined,
    maxWord: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });
  const { data: rawData, mutate } = useSWR(
    [
      "/jobs/",
      filter.sortBy,
      filter.premiumJob.join(", "),
      filter.type.join(", "),
      filter.minWord,
      filter.maxWord,
      filter.minPrice,
      filter.maxPrice,
    ],
    (url, sortBy, premiumJob, type, minWord, maxWord, minPrice, maxPrice) => {
      const params = {
        ordering: sortBy,
      };

      if (premiumJob) {
        params.premium_job__in = premiumJob;
      }
      if (type) {
        params.type__in = type;
      }
      if (minWord) {
        params.word_count__gte = minWord;
      }
      if (maxWord) {
        params.word_count__lte = maxWord;
      }
      if (minPrice) {
        params.sub_total__gte = minPrice;
      }
      if (maxPrice) {
        params.sub_total__lte = maxPrice;
      }

      return fetcher(url, { params });
    }
  );
  const isLoading = !rawData;
  const data = maybe(() => rawData.results, []);

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <div className={styles.flex}>
          <div className={styles.body}>
            <div className={styles.bodyHeader}>
              <H3>Your job feed</H3>
              <div className={styles.bodyHeaderFlex}>
                <div className={styles.bodyHeaderFlex}>
                  <span>Sort by</span>
                  <GreenSelectBox
                    className={styles.greenSelectBox}
                    innerClassName={styles.greenSelectBoxInner}
                    options={sortOptions}
                    onChange={(selected) => {
                      setFilter({ sortBy: selected.value });
                    }}
                    defaultValue={sortOptions[0]}
                  />
                </div>
                <Button
                  className={styles.bodyHeaderReload}
                  type="fab"
                  isLoading={isLoading}
                  onClick={mutate}
                >
                  <ButtonIcon className={styles.bodyHeaderReloadIcon} svg={IconReload} />
                </Button>
              </div>
            </div>
            <div className={styles.bodyJobs}>
              {isLoading ? (
                <LoadingWrapper />
              ) : data.length > 0 ? (
                data.map((item) => (
                  <div key={item.id} className={styles.bodyJobItem}>
                    <JobFeedsItem data={item} />
                  </div>
                ))
              ) : (
                <div className={styles.notFound}>
                  <div>There is no job yet</div>
                </div>
              )}
            </div>
          </div>
          <JobFeedsSidebar
            isLoading={isLoading}
            filter={filter}
            setFilter={setFilter}
            jobTypeOptions={jobTypeOptions}
          />
        </div>
      </div>
    </div>
  );
};
const JobFeeds = () => {
  const { data: typeData } = useSWR("/jobs/types/", fetcher);
  const jobTypeOptions = maybe(() => typeData.results, []);
  if (!typeData) return <LoadingWrapper />;
  return <Base jobTypeOptions={jobTypeOptions} />;
};

export default JobFeeds;
