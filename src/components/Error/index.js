import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import styles from "./Error.module.css";

const Error = ({ msn = "", open = false, setHandleError = () => {} }) => {
  const close = () => {
    setTimeout(() => {
      setHandleError({
        error: false,
        msn: "",
      });
    }, 5000);
  };
  const closeClick = () => {
    setHandleError({
      error: false,
      msn: "",
    });
  };

  useEffect(() => {
    close();
  }, []);

  return (
    <>
      {open && (
        <div className={styles.containerError}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              },
            }}
            className={styles.badge}
            onClick={() => closeClick()}
          >
            <span> {msn}</span>
          </motion.div>
        </div>
      )}
    </>
  );
};
Error.propTypes = {
  msn: PropTypes.string,
  open: PropTypes.bool,
  setHandleError: PropTypes.func,
};
export default Error;
