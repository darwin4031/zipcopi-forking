import dayjs from "dayjs";
import { useState } from "react";
import useSWR from "swr";
import AvatarCard from "~components/elements/AvatarCard";
import IconSearch from "~components/svg/icon-search.svg";
import { fetcher, maybe } from "~utils/index";
import Button from "../../../../elements/Button";
import styles from "./JobWriterWorks.module.scss";
import Popup from "~components/elements/Popup";
import WriterWork from "./WriterWork";

const JobWriterWorkHistories = ({ jobId }) => {
  const [open, setOpen] = useState(false);
  const [workSelected, setWorkSelected] = useState(undefined);

  const { data } = useSWR(`/jobs/${jobId}/writer_works/`, fetcher);
  const works = maybe(() => data.results, []);
  if (!data) return null;
  if (works.length === 0) return null;

  return (
    <>
      <div className={styles.container}>
        <h5>Previous works</h5>
        <table className={styles.table}>
          <thead>
            <tr>
              <th align="left">Created At</th>
              <th align="left">Writer</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {works.map((work) => {
              const {
                id,
                created_at,
                writer_display: { avatar, first_name, last_name },
              } = work;
              return (
                <tr key={id}>
                  <td>{dayjs(created_at + "z").format("DD/MM/YYYY")}</td>
                  <td className={styles.avatarContainer}>
                    <AvatarCard image={avatar ? avatar : "/img/avatar.png"} />
                    <span>{`${first_name} ${last_name}`}</span>
                  </td>
                  <td align="center">
                    <div
                      className={styles.iconContainer}
                      onClick={() => {
                        setWorkSelected(work);
                        setOpen(true);
                      }}
                    >
                      <IconSearch className={styles.icon} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Popup isOpen={open} onClose={() => setOpen(false)}>
        <div className={styles.popUpContainer}>
          <div>{workSelected !== undefined && <WriterWork data={workSelected} />}</div>
          <Button label="Back" variant="secondary" onClick={() => setOpen(false)} />
        </div>
      </Popup>
    </>
  );
};

export default JobWriterWorkHistories;
