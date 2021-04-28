import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import IconCloseModal from "../../../public/static/svg/IconCloseModal";

const Modal = ({
  open = true,
  children = null,
  close = () => {},
  width = "961px",
  height = "492px",
}) => {
  const handleClose = () => {
    close(false);
  };
  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <div className={styles.modal} style={{ width, height }}>
            <div className={styles.modalButtonClose}>
              <button onClick={() => handleClose()}>
                <IconCloseModal />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Modal;
