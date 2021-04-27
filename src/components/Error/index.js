import React, { useEffect } from "react";
import PropTypes from "prop-types";
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
          <div className={styles.badge} onClick={() => closeClick()}>
            <span>{msn}</span>
          </div>
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
