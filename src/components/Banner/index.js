import React from "react";
import { motion } from "framer-motion";

import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <motion.div
      className={styles.containerBanner}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.4,
          },
        },
      }}
    >
      <div className={styles.banner}></div>
    </motion.div>
  );
};

export default Banner;
