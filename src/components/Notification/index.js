import React, { useEffect, useState } from "react";
import moment from "moment";
import IconCloseNotification from "../../../public/static/svg/IconCloseNotification";
import styles from "./Notification.module.css";

const Notification = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);
  console.log("hour =>", moment().format("HH"));
  return (
    <>
      {show && (
        <div className={styles.notification}>
          <span>Tiempo máximo de entrega 12 horas</span>
          <div className={styles.close} onClick={() => setShow(false)}>
            <IconCloseNotification />
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
