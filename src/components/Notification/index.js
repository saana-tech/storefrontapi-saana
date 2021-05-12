import moment from "moment";
import React, { useEffect, useState } from "react";
import IconCloseNotification from "../../../public/static/svg/IconCloseNotification";
import { generateSchedule } from "../../helper/time";
import styles from "./Notification.module.css";

const Notification = () => {
  let openHour = generateSchedule(
    moment(
      Date.parse(
        "Mon Dec 14 2020 08:00:56 GMT-0500 (hora estándar de Colombia)"
      )
    ).format("HH:MM"),
    moment(
      Date.parse(
        "Mon Dec 14 2020 16:00:56 GMT-0500 (hora estándar de Colombia)"
      )
    ).format("HH:MM")
  );

  const [show, setShow] = useState(false);

  const handleMsn = () => {
    const hour = "Wed May 12 2021 16:05:03 GMT-0500 (hora de verano central)";
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
