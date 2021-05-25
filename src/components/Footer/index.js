import React from "react";
import { useRouter } from "next/router";
import Container from "../Container";
import styles from "./Footer.module.css";
import util from "../../util";
import { AVISO_PRIVACIDAD, TRATAMIENTO_DATOS, TYC } from "../../constants";

const Footer = () => {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };
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
            <div className={styles.col1}>
              <h3>Información de interés</h3>
              <ul>
                <li>
                  <a onClick={() => util.openWebTab(TRATAMIENTO_DATOS)}>
                    Política de tratamiento de datos
                  </a>
                </li>{" "}
                <li>
                  <a onClick={() => util.openWebTab(AVISO_PRIVACIDAD)}>
                    Aviso de privacidad
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
                  <a href="tel:+57333 0333534">+57 333 0333534</a>
                </li>
                <li>
                  <a href="mailto:atencionalusuario@saana.com.co">
                    atencionalusuario@saana.com.co
                  </a>
                </li>
                <li>
                  <a href="mailto:notificacionesjudiciales@saana.com.co">
                    notificacionesjudiciales@saana.com.co
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.col2}>
              <h3>PQRS</h3>
              <ul>
                <li>
                  <a onClick={() => handleRoute("/Pqr")}>Crear PQR</a>
                </li>
                <li>
                  <a onClick={() => handleRoute("/TrackingPqr")}>
                    Seguimiento PQR
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
