import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { StoreContext } from "../../core";

import ArrowDown from "../../../public/static/svg/ArrowDown";
import IconHome from "../../../public/static/svg/IconHome";
import IconUser from "../../../public/static/svg/IconUser";
import IconServiceLine from "../../../public/static/svg/IconServiceLine";
import IconCloseWhite from "../../../public/static/svg/IconCloseWhite";
import styles from "./MenuResponsive.module.css";
import ModalConfirmation from "../ModalConfirmation";
import { signOffDispatch } from "../../core/global/actions";

const MenuResponsive = ({
  open = false,
  close = () => {},
  openModalRegister = () => {},
}) => {
  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { user } = globalState;

  const router = useRouter();

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleRoute = (route) => {
    close(false);
    router.push(route);
  };

  const handleSingOff = async () => {
    await signOffDispatch(globalDispatch);
    router.push("/");
  };
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
                  <button onClick={() => openModalRegister(true)}>
                    Iniciar sesión
                  </button>
                </div>
              )}
            </div>
            <div className={styles.body}>
              <div className={styles.link} onClick={() => handleRoute("/")}>
                <IconHome />
                <a>Home</a>
              </div>
              {user && (
                <>
                  <div className={styles.separator} />

                  <div
                    className={styles.link}
                    onClick={() => handleRoute("/Profile")}
                  >
                    <IconUser />
                    <a>Mi perfil</a>
                  </div>
                </>
              )}

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
      <ModalConfirmation
        action={() => handleSingOff()}
        open={modalShow}
        close={setModalShow}
        msn={"¿Estas seguro(a) que deseas cerrar sesión?"}
      />
      ;
    </>
  );
};
MenuResponsive.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  openModalRegister: PropTypes.func,
};
export default MenuResponsive;
