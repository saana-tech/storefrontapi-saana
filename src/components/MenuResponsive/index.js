import React, { useState } from "react";
import PropTypes from "prop-types";

import ArrowDown from "../../../public/static/svg/ArrowDown";
import IconHome from "../../../public/static/svg/IconHome";
import IconServiceLine from "../../../public/static/svg/IconServiceLine";
import IconCloseWhite from "../../../public/static/svg/IconCloseWhite";
import styles from "./MenuResponsive.module.css";

const MenuResponsive = ({
  open = false,
  close = () => {},
  openModalRegister = () => {},
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className={styles.iconClose} onClick={() => close(false)}>
              <IconCloseWhite close={close} />
            </div>
            <div className={styles.header}>
              <div className={styles.imgProfile}>
                <img src={"/static/img/user.png"} />
              </div>
              <div>
                <h4>¡Hola!</h4>
                <span>No tienes una cuenta conectada</span>
              </div>
              <div className={styles.containerButtons}>
                <button>Crear una cuenta</button>
                <button onClick={() => openModalRegister(true)}>
                  Iniciar sesión
                </button>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.link}>
                <IconHome />
                <a>Home</a>
              </div>
              <div className={styles.separator} />
              <div
                className={styles.link}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => setShow(!show)}
                >
                  <IconServiceLine />
                  <a>Mas Servicios</a>
                </div>
                <ArrowDown />
              </div>
              {show && (
                <div className={styles.subMenu}>
                  <ul>
                    <li>Saana lab</li>
                    <li>Saana consulta</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
MenuResponsive.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  openModalRegister: PropTypes.func,
};
export default MenuResponsive;
