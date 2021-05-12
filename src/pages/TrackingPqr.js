import React, { useContext, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { StoreContext } from "../core";
import Error from "../components/Error";
import { searchPqr } from "../core/Pqr/actions";

import styles from "../styles/TrakingPqr.module.css";
import moment from "moment";
import ArrowLeft from "../../public/static/svg/ArrowLeft";

const TrackingPqr = () => {
  const colorsStatus = ["#e4ac88", "#edab5f", "#81b19a", "#00718e", "#c67777"];
  const status = [
    "En revision",
    "En proyección",
    "proceso enviado",
    " prorroga",
  ];

  const { state, pqrDispatch } = useContext(StoreContext);
  const { pqrState } = state;
  const { loading } = pqrState;

  const [verification, setVerification] = useState(false);
  const [pqr, setPqr] = useState(null);
  const [search, setSearch] = useState("");
  const [handleError, setHandleError] = useState({ error: false, msn: "" });

  const onChange = (value) => {
    if (value) {
      setVerification(true);
    }
  };
  const handleExpired = () => {
    setHandleError({ error: true, msn: "Por favor chequear el reCAPTCHA" });
    setVerification(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      setHandleError({ error: true, msn: "El id del radicado es obligatorio" });
      return;
    }
    if (!verification) {
      setHandleError({ error: true, msn: "Por favor chequear el reCAPTCHA" });
      return;
    }
    const result = await searchPqr(search, pqrDispatch);
    if (!result) {
      setHandleError({
        error: true,
        msn: "El id de radicado que usted ingreso. No existe",
      });
      return;
    }
    setSearch("");
    setPqr(result);
  };
  return (
    <div>
      <Error
        msn={handleError.msn}
        open={handleError.error}
        setHandleError={setHandleError}
      />
      <Container>
        {!pqr ? (
          <div>
            <div>
              <h1>Seguimiento de PQR</h1>
              <span>Para continuar ingrese el numero de radicado</span>
              <form className={styles.formSearch} onSubmit={handleSearch}>
                <input
                  className={styles.input}
                  placeholder={"EJ: ad4d5"}
                  onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().trim())
                  }
                  value={search}
                />
                <button>
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Buscar"
                  )}
                </button>
              </form>
            </div>
            <div className={styles.recaptura}>
              <div>
                <p></p>
              </div>
              <ReCAPTCHA
                sitekey={"6Ld8vM4aAAAAAMLQkRYrFqoLj-wANba9deGQlahh"}
                onChange={onChange}
                onExpired={() => handleExpired()}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.back} onClick={() => setPqr(null)}>
              <ArrowLeft />
            </div>
            <div className={styles.card}>
              <div className={styles.col1}>
                <div className={styles.pqrInfo}>
                  <h3>Consulta el estado de PQR</h3>
                  <h3>NO. {pqr?.idRequest}</h3>
                </div>
              </div>
              <div className={styles.col2}>
                <div className={styles.badge1}>
                  <h4>Estado:</h4>
                  <span style={{ backgroundColor: colorsStatus[pqr.status] }}>
                    {status[pqr.status]}
                  </span>
                </div>
                <div className={styles.badge1}>
                  <h4>Creación:</h4>
                  <span>{moment(pqr?.create).format("DD/MM/YY HH:mm")}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TrackingPqr;
