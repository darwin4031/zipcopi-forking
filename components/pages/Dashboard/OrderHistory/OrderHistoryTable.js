import { Fragment } from "react";
import AvatarCard from "~components/elements/AvatarCard";
import Button from "~components/elements/Button";
import IconRatingStar from "~components/svg/icon-rating-star.svg";
import { status } from "~config/enums";
import styles from "./OrderHistoryTable.module.scss";

function OrderHistoryTable({ orders }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th align="left">Buyer</th>
            {/* <th align="left">Delivery At</th> */}
            <th align="center">Total</th>
            <th align="center">Rating</th>
            <th align="center">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Fragment key={`table-row${order.id}`}>
              <tr className={styles.spacerRow}></tr>
              <tr className={styles.bodyRows}>
                <td align="left">
                  <div className={styles.buyerCell}>
                    <AvatarCard className={styles.buyerImage} image={"/img/avatar.png"} />
                    {order.company}
                  </div>
                </td>
                {/* <td align="left">{order.deliveryAt}</td> */}
                <td align="center">${order.total}</td>
                <td align="center">
                  <div className={styles.ratingCell}>
                    <IconRatingStar className={styles.ratingIcon} />
                    {order.job_rates[0]?.rate}
                  </div>
                </td>
                <td align="center">
                  <Button variant="success">{status[order.status].display}</Button>
                </td>
              </tr>
            </Fragment>
          ))}
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

export default OrderHistoryTable;
