import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        <motion.button
          animate={{
            scale: [2, 1.5, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["10%", "20%", "30%", "40%", "50%"],
          }}
          className={styles.button}
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=573152738113",
              "_blank"
            )
          }
        >
          <IconWhatsapp />
        </motion.button>
      )}
    </>
  );
};

export default Whatsapp;
