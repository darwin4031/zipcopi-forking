import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { cloneElement } from "react";
import IconCalendar from "~components/svg/icon-calendar.svg";
import IconBlog from "~components/svg/icon-project-type-blog.svg";
import IconCustom from "~components/svg/icon-project-type-custom.svg";
import IconEmail from "~components/svg/icon-project-type-marketing-email.svg";
import IconPress from "~components/svg/icon-project-type-press-release.svg";
import IconProduct from "~components/svg/icon-project-type-product-description.svg";
import IconWebsite from "~components/svg/icon-project-type-website.svg";
import IconWordCount from "~components/svg/icon-word-count.svg";
import { status as statusEnums } from "~config/enums";
import styles from "./JobCard.module.scss";

const iconMapper = {
  Blog: <IconBlog />,
  "Press Release": <IconPress />,
  "Website Copy": <IconWebsite />,
  "Marketing Email": <IconEmail />,
  "Product Description": <IconProduct />,
  "Custom Job": <IconCustom />,
};

const JobCard = ({ data }) => {
  const {
    id,
    status,
    word_count,
    deadline_date,
    bulk_quantity,
    unit_total,
    brief,
    type_display: { name: typeName },
    subject_display: { name: subjectName },
  } = data;
  const icon = iconMapper?.[typeName] ? iconMapper[typeName] : iconMapper["Custom Job"];
  const iconComp = cloneElement(icon, { className: styles.itemSvg });

  return (
    <Link href={`/dashboard/jobs/${id}`}>
      <div className={styles.container}>
        <div className={styles.icon}>{iconComp}</div>
        <div className={styles.body}>
          <div className={styles.title}>
            #{id}-{subjectName}
          </div>
          <div className={styles.brief}>{brief}</div>
          <div className={styles.itemGroupWrapper}>
            <div className={styles.itemGroup}>
              <div className={styles.itemGroupIcon}>
                <IconCalendar className={styles.itemGroupSvg} />
              </div>
              <div className={styles.itemGroupText}>
                {deadline_date ? dayjs(deadline_date).format("d/M/YYYY") : "n/a"}
              </div>
            </div>
            <div className={styles.itemGroup}>
              <div className={styles.itemGroupIcon}>
                <IconWordCount className={styles.itemGroupSvg} />
              </div>
              <div className={styles.itemGroupText}>{word_count.toLocaleString()}</div>
            </div>
          </div>
          <div className={styles.tagsWrapper}>
            <div className={clsx(styles.tag)}>{statusEnums[status].display}</div>
            <div className={clsx(styles.tag)}>{typeName}</div>
          </div>
          <div className={styles.tagsWrapper}>
            <div className={clsx(styles.tag)}>
              {bulk_quantity}x{unit_total.toLocaleString()} = £
              {(bulk_quantity * unit_total).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
