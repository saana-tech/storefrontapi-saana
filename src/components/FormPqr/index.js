import React, { useCallback, useEffect, useState } from "react";
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
  checkTyC: false,
  checkPersonalData: false,
  checkEmail: false,
  typeDocument: "",
  invitePersonalData: {
    name: "",
    phone: "",
    address: "",
    ci: "",
    email: "",
    city: "",
  },
};

const FormPqr = () => {
  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUE);
  const [mode, setMode] = useState("for me");
  const [handleError, setHandleError] = useState({ error: false, msn: "" });

  const onChange = (value) => {
    console.log("Captcha value:=>", value);
  };
  const validateForm = () => {
    for (let property in values) {
      console.log("value =>", values[property]);
      if (values[property] === "") {
        setHandleError({
          error: true,
          msn: "Todos los campos son necesarios, recuerda aceptar términos y condiciones",
        });
        return true;
      } else {
        return false;
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validateForm();
    console.log("se envia", validate);
  };

  const onChangeText = (target, value) => {
    setValues({ ...values, [target]: value });
  };
  const handleDisabled = useCallback(() => {
    const res = validateForm();
    if (res) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  useEffect(() => {
    handleDisabled();
  }, [handleDisabled]);
  return (
    <div className={styles.containerForm}>
      <Error
        msn={handleError.msn}
        open={handleError.error}
        setHandleError={setHandleError}
      />
      <h2>Solicitud PQR</h2>
      <div>
        <h4 className={styles.titleSection}>¿Radica para alguien más?</h4>{" "}
        <select
          className={styles.select}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value={"for me"}>Para mí</option>
          <option value={"for someone else"}>Para alguien más</option>
        </select>
        <h4 className={styles.titleSection}> Datos del solicitante</h4>{" "}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.colInput}>
            <input
              placeholder={"Nombre y Apellidos"}
              className={styles.input}
              name={"name"}
              value={values.name}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
            <input
              placeholder={"Teléfono"}
              className={styles.input}
              name={"phone"}
              value={values.phone}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
          </div>
          <div className={styles.colInput}>
            <input
              placeholder={"Dirección"}
              className={styles.input}
              name={"address"}
              value={values.address}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
          </div>
          <div className={styles.colInput}>
            <input
              placeholder={"Ciudad"}
              className={styles.input}
              name={"city"}
              value={values.city}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
            <input
              placeholder={"Email"}
              className={styles.input}
              name={"email"}
              value={values.email}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
          </div>
          <div className={styles.colInput}>
            <select
              className={styles.select}
              value={values.typeDocument}
              name={"typeDocument"}
              onChange={(e) => onChangeText("typeDocument", e.target.value)}
            >
              <option>Cédula de ciudadanía</option>
              <option>Cédula de extranjería</option>
              <option>Tarjeta de identidad</option>
              <option>Nit</option>
              <option>Pasaporte</option>
              <option>Pep</option>
            </select>
            <input
              placeholder={"Número de documento"}
              className={styles.input}
              name={"ci"}
              value={values.ci}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
          </div>
          {mode === "for someone else" && (
            <div>
              <h4 className={styles.titleSection}>
                Datos de quién la presenta
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
          <select
            className={styles.select}
            name={"typeRequest"}
            value={values.typeRequest}
            onChange={(e) => onChangeText(e.target.name, e.target.value)}
          >
            <option>--Seleccione--</option>
            <option>Petición</option>
            <option>Queja</option>
            <option>Reclamo</option>
            <option>Sugerencia</option>
          </select>

          <h4 className={styles.titleSection}>
            Motivo de la solicitud{" "}
            <span className={styles.textGray}>
              {values.reasonForRequest.length} {"/5000"}
            </span>
          </h4>

          <textarea
            className={styles.textarea}
            placeholder={"Descripción"}
            maxLength={5000}
            name={"reasonForRequest"}
            value={values.reasonForRequest}
            onChange={(e) => onChangeText(e.target.name, e.target.value)}
          />
          <div className={styles.note}>
            <p>
              (si es el caso, adjuntar documentos que sustenten la solicitud.
              ej: facturas, e-mail, pantallazos del sistema, cartas, entre
              otros). Permite adjuntar archivos máximo de 2 MB en formatos pdf,
              jpg y png.
            </p>
          </div>
          <h4 className={styles.titleSection}>
            Documentos <span className={styles.textGray}>{"(OPCIONAL)"}</span>
          </h4>

          <input type={"file"} accept={".pdf .jpg"} />
          <textarea
            className={styles.textarea}
            placeholder={"Descripción"}
          ></textarea>
          <div className={styles.checkTyC}>
            <input
              type={"checkbox"}
              checked={values.checkTyC}
              onChange={() => onChangeText("checkTyC", !values.checkTyC)}
            />
            <label>
              He leído y acepto la{" "}
              <a className={styles.link}>
                política de tratamiento de datos personales
              </a>
            </label>
          </div>
          <div className={styles.inputAuthorization}>
            <div className={styles.msnAuthorization}>
              <span>
                Autorizo el envió de la respuesta por medio de correo
                electrónico{" "}
              </span>
            </div>

            <div>
              <div className={styles.checkTyC}>
                <input
                  type={"checkbox"}
                  name={"checkEmail"}
                  value={values.checkEmail}
                  onChange={() =>
                    onChangeText("checkEmail", !values.checkEmail)
                  }
                />
              </div>
            </div>
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
