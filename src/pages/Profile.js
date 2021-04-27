import React, { useState } from "react";
import ContentProfile from "../components/ContentProfile";
import NavProfile from "../components/NavProfile";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  const [path, setPath] = useState("Mis Ordenes");
  return (
    <div className={styles.contentProfile}>
      <div className={styles.navbar}>
        <NavProfile setPath={setPath} path={path} />
      </div>
      <div className={styles.content}>
        <ContentProfile setPath={setPath} path={path} />
      </div>
    </div>
  );
};

export default Profile;
