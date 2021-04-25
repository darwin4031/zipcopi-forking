import dayjs from "dayjs";
import { Fragment } from "react";
import styles from "./BillingHistoryTable.module.scss";

function BillingHistoryTable({ bills }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th align="left">Date</th>
            <th align="left">Description</th>
            <th align="center">Write</th>
            <th align="center">Amount</th>
            <th align="center">ID</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => {
            const { id, created_at, amount, writer_display } = bill;
            const writer = writer_display
              ? `${writer_display.first_name} ${writer_display.last_name}`
              : "-";
            return (
              <Fragment key={`table-row${id}`}>
                <tr className={styles.spacerRow}></tr>
                <tr className={styles.bodyRows}>
                  <td className={styles.billDate}>
                    {dayjs(created_at + "Z").format("MMM DD, YYYY")}
                  </td>
                  <td>{bill.description}</td>
                  <td align="center">{writer}</td>
                  <td align="center">£{amount}</td>
                  <td align="center" className={styles.billId}>
                    #{id}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function getServerSideProps({}) {
  return {
    props: {},
  };
}

export default BillingHistoryTable;
