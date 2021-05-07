import React, { useEffect, useState } from "react";
import IconWhatsapp from "../../../public/static/svg/IconWhatsapp";
import styles from "./Whatsapp.module.css";

const Whatsapp = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  return (
    <>
      {show && (
        <button
          className={styles.button}
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=573152738113",
              "_blank"
            )
          }
        >
          <IconWhatsapp />
        </button>
      )}
    </>
  );
};

export default Whatsapp;
