import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { cloneElement } from "react";
import { H4 } from "~components/elements/Heading";
import IconCalendar from "~components/svg/icon-calendar.svg";
import IconChevronRight from "~components/svg/icon-chevron-right.svg";
import IconBlog from "~components/svg/icon-project-type-blog.svg";
import IconCustom from "~components/svg/icon-project-type-custom.svg";
import IconEmail from "~components/svg/icon-project-type-marketing-email.svg";
import IconPress from "~components/svg/icon-project-type-press-release.svg";
import IconProduct from "~components/svg/icon-project-type-product-description.svg";
import IconWebsite from "~components/svg/icon-project-type-website.svg";
import IconWordCount from "~components/svg/icon-word-count.svg";
import styles from "./index.module.scss";

const iconMapper = {
  Blog: <IconBlog />,
  "Press Release": <IconPress />,
  "Website Copy": <IconWebsite />,
  "Marketing Email": <IconEmail />,
  "Product Description": <IconProduct />,
  "Custom Job": <IconCustom />,
};

const JobFeedsItem = ({ className, data }) => {
  const {
    type_display: { name: typeName },
  } = data;
  const icon = iconMapper?.[typeName] ? iconMapper[typeName] : iconMapper["Custom Job"];
  const iconComp = cloneElement(icon, { className: styles.itemSvg });

  const brief =
    data.brief && data.brief.length > 180 ? `${data.brief.slice(0, 180)} ...` : data.brief;

  return (
    <Link href={`/dashboard/jobs/${data.id}`}>
      <a className={clsx(styles.item, className)}>
        <div className={styles.itemIcon}>{iconComp}</div>
        <div className={styles.itemBody}>
          <div className={styles.itemTitle}>{data.title}</div>
          <div className={styles.itemBrief}>{brief}</div>

          <div className={styles.itemGroupWrapper}>
            <div className={clsx(styles.groupItem, styles.date)}>
              <div className={styles.groupItemIcon}>
                <IconCalendar className={styles.groupItemSvg} />
              </div>
              <div className={styles.groupItemText}>
                {dayjs(data.created_at).format("DD/MM/YYYY")}
              </div>
            </div>
            <div className={clsx(styles.groupItem, styles.wordCount)}>
              <div className={styles.groupItemIcon}>
                <IconWordCount className={styles.groupItemSvg} />
              </div>
              <div className={styles.groupItemText}>{data.word_count}</div>
            </div>
            <div className={clsx(styles.groupItem, styles.type)}>
              {data.type_display?.name ?? ""}
            </div>

            {/* Location */}
            {/* <div className={clsx(styles.groupItem, styles.location)}>
              {data.location}
            </div> */}

            <div className={clsx(styles.groupItem, styles.location)}>
              {dayjs(data.created_at).fromNow()}
            </div>
          </div>
        </div>
        <div className={styles.itemAction}>
          <H4 className={styles.itemActionPrice}>£{data.sub_total}</H4>
          <IconChevronRight className={styles.itemActionSvg} />
        </div>
      </a>
    </Link>
  );
};

export default JobFeedsItem;
