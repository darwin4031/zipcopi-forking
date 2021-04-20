import React, { useContext, useEffect, useState } from "react";
import styles from "./MessagesItem.module.scss";
import IconChevronRight from "@/components/Svg/icon-chevron-right.svg";
import { format } from "date-fns";
import clsx from "clsx";

const MessagesItem = ({ date, name, content, isActive, onClick }) => {
  return (
    <button
      className={clsx(styles.root, "reset-button", isActive && styles.isActive)}
      onClick={onClick}
    >
      <div className={styles.flex}>
        <div className={styles.avatar}>
          <img src="/img/dashboard/user.png" alt="User avatar" />
        </div>
        <div className={styles.body}>
          {date ? (
            <div className={styles.date}>
              {format(new Date(date + "Z"), "MMM dd HH:mm")}
            </div>
          ) : null}
          <div className={styles.name}>{name}</div>
          {content ? <div className={styles.content}>{content}</div> : null}
        </div>
        <div className={styles.arrow}>
          <IconChevronRight className={styles.arrowIcon} />
        </div>
      </div>
    </button>
  );
};

export default MessagesItem;
