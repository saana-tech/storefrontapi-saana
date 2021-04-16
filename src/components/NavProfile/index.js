import React from "react";
import styles from "./NavProfile.module.css";

const NavProfile = ({ path, setPath }) => {
  console.log("patch =>", path);
  return (
    <div className={styles.content}>
      <div className={styles.profile}>
        <div className={styles.contentProfile}>
          <div className={styles.imgProfile}>
            <img src={"/static/img/user.png"} />
          </div>
          <div className={styles.information}>
            <span className={styles.title}>Mi perfil</span>
            <span>Jesus briceño</span>
          </div>
        </div>
      </div>
      <div className={styles.containerLinks}>
        <div className={styles.contentLinks}>
          <a
            className={path === "Mis Ordenes" ? "activeLink" : "noneLink"}
            onClick={() => setPath("Mis Ordenes")}
          >
            Mis Ordenes
          </a>
          <a
            className={path === "Mis Direcciones" ? "activeLink" : "noneLink"}
            onClick={() => setPath("Mis Direcciones")}
          >
            Mis Direcciones
          </a>
          <a>Cerrar sesión</a>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
