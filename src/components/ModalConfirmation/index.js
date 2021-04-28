import React from "react";
import styles from "./ModalConfirmation.module.css";
import PropTypes from "prop-types";
import IconCloseModal from "../../../public/static/svg/IconCloseModal";

const ModalConfirmation = ({ open, close, msn, action }) => {
  const handleClose = () => {
    close(false);
  };
  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className={styles.buttonClose}>
              <button onClick={() => handleClose()}>
                <IconCloseModal />
              </button>
            </div>
            <div className={styles.col1} />
            <div className={styles.col2}>
              <span>{msn}</span>
            </div>

            <div className={styles.containerButtons}>
              <button onClick={() => handleClose()}>Cancelar</button>
              <button onClick={() => action()}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
ModalConfirmation.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  msn: PropTypes.string,
  action: PropTypes.func,
};

export default ModalConfirmation;
