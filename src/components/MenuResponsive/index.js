import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { StoreContext } from "../../core";

import ArrowDown from "../../../public/static/svg/ArrowDown";
import IconHome from "../../../public/static/svg/IconHome";
import IconUser from "../../../public/static/svg/IconUser";
import IconServiceLine from "../../../public/static/svg/IconServiceLine";
import IconCloseWhite from "../../../public/static/svg/IconCloseWhite";
import styles from "./MenuResponsive.module.css";
import ModalConfirmation from "../ModalConfirmation";

const MenuResponsive = ({
  open = false,
  close = () => {},
  openModalRegister = () => {},
}) => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { user } = globalState;

  const [show, setShow] = useState(false);
  const handleRoute = () => {};
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
              {user ? (
                <div className={styles.containerSingOff}>
                  <button>Cerrar sesión</button>
                </div>
              ) : (
                <div className={styles.containerButtons}>
                  <button>Crear una cuenta</button>
                  <button onClick={() => openModalRegister(true)}>
                    Iniciar sesión
                  </button>
                </div>
              )}
            </div>
            <div className={styles.body}>
              <div className={styles.link}>
                <IconHome />
                <a>Home</a>
              </div>
              <div className={styles.separator} />
              <div className={styles.link} onClick={() => handleRoute()}>
                <IconUser />
                <a>Mi perfil</a>
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
      <ModalConfirmation />
    </>
  );
};
MenuResponsive.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  openModalRegister: PropTypes.func,
};
export default MenuResponsive;
