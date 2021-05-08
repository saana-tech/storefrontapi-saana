import React, { useEffect, useState } from "react";
import moment from "moment";
import IconCloseNotification from "../../../public/static/svg/IconCloseNotification";
import styles from "./Notification.module.css";
import util from "../../util";

const Notification = () => {
  let openHour = util.generateSchedule(
    moment(
      Date.parse(
        "Mon Dec 14 2020 06:00:56 GMT-0500 (hora estándar de Colombia)"
      )
    ).format("HH:MM"),
    moment(
      Date.parse(
        "Mon Dec 14 2020 16:00:56 GMT-0500 (hora estándar de Colombia)"
      )
    ).format("HH:MM")
  );

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);
  const currentDay = moment(
    "2021-05-08T16:00:39-05:00",
    "YYYY-MM-DD HH:mm"
  ).format("HH:MM");

  const handleMsn = () => {
    const response = openHour(currentDay);
    if (!response) {
      return "Su pedido sera entregado mañana después de las 6 am";
    } else {
      return "Tiempo máximo de entrega 12 horas";
    }
  };

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
