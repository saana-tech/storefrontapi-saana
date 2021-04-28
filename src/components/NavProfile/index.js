import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./NavProfile.module.css";
import ModalConfirmation from "../ModalConfirmation";
import { signOffDispatch } from "../../core/global/actions";
import { StoreContext } from "../../core";

const NavProfile = ({ path, setPath }) => {
  const router = useRouter();
  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { user } = globalState;
  const [modalShow, setModalShow] = useState(false);

  const handleSingOff = async () => {
    await signOffDispatch(globalDispatch);
    router.push("/");
  };
  return (
    <>
      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.contentProfile}>
            <div className={styles.imgProfile}>
              <img src={"/static/img/user.png"} />
            </div>
            <div className={styles.information}>
              <span className={styles.title}>Mi perfil</span>
              <span className={styles.name}>{user?.displayName}</span>
            </div>
          </div>
        </div>
        <div className={styles.containerLinks}>
          <div className={styles.contentLinks}>
            <div className={styles.linksResponsive}>
              <a
                className={path === "Mis Ordenes" ? "activeLink" : "noneLink"}
                onClick={() => setPath("Mis Ordenes")}
              >
                Mis Ordenes
              </a>
              <a
                className={
                  path === "Mis Direcciones" ? "activeLink" : "noneLink"
                }
                onClick={() => setPath("Mis Direcciones")}
              >
                Mis Direcciones
              </a>
            </div>

            <a onClick={() => setModalShow(true)}>Cerrar sesión</a>
          </div>
        </div>
      </div>
      <ModalConfirmation
        action={() => handleSingOff()}
        open={modalShow}
        close={setModalShow}
        msn={"¿Estas seguro(a) que deseas cerrar sesión?"}
      />
    </>
  );
};

NavProfile.propTypes = {
  path: PropTypes.string,
  setPath: PropTypes.func,
};

export default NavProfile;
