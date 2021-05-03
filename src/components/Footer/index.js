import React, { useState } from "react";
import Container from "../Container";
import styles from "./Footer.module.css";

const Footer = () => {
  const [value, setValue] = useState("");
  const logo =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/logo_saana_farma_white.png?v=1617333776";

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer className={styles.footerPrincipal}>
      <Container>
        <div className={styles.containerFooter}>
          <div className={styles.containerLogo}>
            <img src={logo} alt={"Saanafarma logo"} />
          </div>
          <div className={styles.containerBody}>
            <div className={styles.containerUl}>
              <div className={styles.col1}>
                <h3>Saana</h3>
                <ul>
                  <li>
                    <a>Saana consulta</a>
                  </li>
                  <li>
                    <a>Saana lab</a>
                  </li>{" "}
                  <li>
                    <a>Política y privacidad</a>
                  </li>{" "}
                  <li>
                    <a>Términos y condiciones</a>
                  </li>
                </ul>
              </div>
              <div className={styles.col2}>
                <h3>Contacto</h3>
                <ul>
                  <li>
                    <a>+57 333 033 3435</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.col3}>
              <h3>Newsletter </h3>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type={"email"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={"Dirección de correo electrónico"}
                />
                <button type={"submit"}>Suscribirse</button>
              </form>
            </div>
          </div>
          <div className={styles.copyright}>
            <span>© 2021 SAANA. Todos los derechos reservados</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
