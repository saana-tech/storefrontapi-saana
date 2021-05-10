import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Error from "../Error";
import styles from "./FormPqr.module.css";

const INITIAL_VALUE = {
  name: "",
  phone: "",
  address: "",
  ci: "",
  email: "",
  city: "",
  typeRequest: "",
  reasonForRequest: "",
  descriptionDocuments: "",
  check: false,
  checkPersonalData: false,
};

const FormPqr = () => {
  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUE);
  const [mode, setMode] = useState("for me");
  const [handleError, setHandleError] = useState({ error: false, msn: "" });

  const onChange = (value) => {
    console.log("Captcha value:=>", value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      address,
      check,
      ci,
      city,
      descriptionDocuments,
      email,
      name,
      phone,
      reasonForRequest,
      typeRequest,
    } = values;
    if (
      address === "" ||
      !check ||
      ci === "" ||
      descriptionDocuments === "" ||
      city === "" ||
      email === "" ||
      name === "" ||
      phone === "" ||
      reasonForRequest === "" ||
      typeRequest === ""
    ) {
      setHandleError({
        error: true,
        msn: "Todos los campos son necesarios, recuerda aceptar términos y condiciones",
      });
      return;
    }
  };

  const onChangeText = (target, value) => {
    setValues({ ...values, [target]: value });
  };
  return (
    <div className={styles.containerForm}>
      <Error
        msn={handleError.msn}
        open={handleError.error}
        setHandleError={setHandleError}
      />
      <h2>Solicitud PQR</h2>
      <div>
        <h4 className={styles.titleSection}>¿Radica para alguien mas?</h4>{" "}
        <select
          className={styles.select}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value={"for me"}>Para mi </option>
          <option value={"for someone else"}>Para alguien mas </option>
        </select>
        <h4 className={styles.titleSection}> Datos del solicitante</h4>{" "}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.colInput}>
            <input
              placeholder={"Nombre y apellidos"}
              className={styles.input}
            />
            <input placeholder={"Teléfono"} className={styles.input} />
          </div>
          <div className={styles.colInput}>
            <input placeholder={"Dirección"} className={styles.input} />
            <input placeholder={"Nit o cedula"} className={styles.input} />
          </div>
          <div className={styles.colInput}>
            <input placeholder={"Ciudad"} className={styles.input} />
            <input placeholder={"Email"} className={styles.input} />
          </div>

          {mode === "for someone else" && (
            <div>
              <h4 className={styles.titleSection}>
                Datos de quien la presenta
              </h4>

              <div className={styles.colInput}>
                <input
                  placeholder={"Nombre y apellidos"}
                  className={styles.input}
                />
                <input placeholder={"Teléfono"} className={styles.input} />
              </div>
              <div className={styles.colInput}>
                <input placeholder={"Dirección"} className={styles.input} />
                <input placeholder={"Nit o cedula"} className={styles.input} />
              </div>
              <div className={styles.colInput}>
                <input placeholder={"Ciudad"} className={styles.input} />
                <input placeholder={"Email"} className={styles.input} />
              </div>
            </div>
          )}
          <h4 className={styles.titleSection}>Tipo de solicitud</h4>
          <select className={styles.select}>
            <option>--Seleccione--</option>
            <option>Petición</option>
            <option>Queja</option>
            <option>Reclamo</option>
            <option>Sugerencia</option>
          </select>

          <h4 className={styles.titleSection}>Motivo de solicitud</h4>

          <textarea
            className={styles.textarea}
            placeholder={"Descripción"}
          ></textarea>
          <div className={styles.note}>
            <p>
              (si es el caso, adjuntar documentos que sustenten la solicitud.
              Ej: Facturas, E-mail, Pantallazos del sistema, Cartas, entre
              otros). Permite adjuntar archivos maximo de 2 MB en formatos pdf,
              jpg y png.
            </p>
          </div>
          <h4 className={styles.titleSection}>Documentos (OPCIONAL)</h4>

          <input type={"file"} accept={".pdf .jpg"} />
          <textarea
            className={styles.textarea}
            placeholder={"Descripción"}
          ></textarea>
          <div className={styles.checkTyC}>
            <input type={"checkbox"} />
            <label>
              He leído y Acepto el acuerdo de{" "}
              <a className={styles.link}>
                confidencialidad y protección de datos
              </a>
            </label>
          </div>
          <ReCAPTCHA
            sitekey={"6Ld8vM4aAAAAAMLQkRYrFqoLj-wANba9deGQlahh"}
            onChange={onChange}
          />
          <button
            disabled={disabled}
            className={disabled ? styles.buttonSend : styles.disabledButton}
          >
            Crear Solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPqr;
