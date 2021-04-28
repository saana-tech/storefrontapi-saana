import React from "react";
import styles from "./ModalConfirmation.module.css";

const ModalConfirmation = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <span>Estas seguro que deseas eliminar</span>
        <div>
          <button>Cancelar</button>
          <button>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
