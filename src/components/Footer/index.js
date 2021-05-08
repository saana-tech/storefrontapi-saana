import React from "react";
import Container from "../Container";
import styles from "./Footer.module.css";
import util from "../../util";
import { AVISO_PRIVACIDAD, TRATAMIENTO_DATOS, TYC } from "../../constants";

const Footer = () => {
  const logo =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/logo_saana_farma_white.png?v=1617333776";

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
                <h3>Legal</h3>
                <ul>
                  <li>
                    <a onClick={() => util.openWebTab(TRATAMIENTO_DATOS)}>
                      Tratamiento de datos
                    </a>
                  </li>{" "}
                  <li>
                    <a onClick={() => util.openWebTab(AVISO_PRIVACIDAD)}>
                      Política y privacidad
                    </a>
                  </li>{" "}
                  <li>
                    <a onClick={() => util.openWebTab(TYC)}>
                      Términos y condiciones
                    </a>
                  </li>
                </ul>
              </div>
              <div className={styles.col2}>
                <h3>Contacto</h3>
                <ul>
                  <li>
                    <a href="tel:+573330333435">+57 333 033 3435</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.col2}>
              <h3>¿Tienes alguna duda o comentario?</h3>
              <ul>
                <li>
                  <a href="mailto:atencionalusuario@saana.com.co">
                    Atención de PQR´s en atencionalusuario@saana.com.co
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.copyright}>
            <div>
              <img
                onClick={() => window.open("https://www.sic.gov.co/", "_blank")}
                className={styles.badge}
                src={"/static/img/superitc.png"}
                alt={"Super intendencia de industria y comercio"}
              />{" "}
              {/*     <img
                onClick={() => window.open("https://www.sic.gov.co/", "_blank")}
                className={styles.badge}
                src={"/static/img/mercadopago.png"}
                alt={"Super intendencia de industria y comercio"}
              /> */}
            </div>
            <div>
              <span>© 2021 SAANA. Todos los derechos reservados</span>{" "}
            </div>
            <div />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
