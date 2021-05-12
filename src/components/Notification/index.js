import moment from "moment";
import React, { useEffect, useState } from "react";
import IconCloseNotification from "../../../public/static/svg/IconCloseNotification";
import { generateSchedule } from "../../helper/time";
import styles from "./Notification.module.css";

const Notification = () => {
  const init = new Date(
    "Mon Dec 14 2020 08:00:56 GMT-0500 (hora estándar de Colombia)"
  );
  const finish = new Date(
    "Mon Dec 14 2020 16:00:56 GMT-0500 (hora estándar de Colombia)"
  );
  let openHour = generateSchedule(
    moment(Date.parse(init)).format("HH:MM"),
    moment(Date.parse(finish)).format("HH:MM")
  );

  const [show, setShow] = useState(false);

  const handleMsn = () => {
    const hour = new Date();
    let sumByhour = moment(hour, "YYYY-MM-DD HH:mm").format("HH:MM");

    let response = openHour(sumByhour);
    if (response) {
      return "Su pedido se entrega en un máximo de 12 horas";
    } else {
      return "Su pedido se entregara mañana";
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <>
      {show && (
        <div className={styles.notification}>
          <span>{handleMsn()}</span>
          <div className={styles.close} onClick={() => setShow(false)}>
            <IconCloseNotification />
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
