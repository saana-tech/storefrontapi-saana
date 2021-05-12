import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress"; //nprogress module

import { Modal, Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import IconCheck from "../../../public/static/svg/IconCheck";
import { storage } from "../../config/firebase";
import { TRATAMIENTO_DATOS } from "../../constants";
import { StoreContext } from "../../core";

import { addRequestDispatch } from "../../core/Pqr/actions";
import util from "../../util";
import Error from "../Error";
import styles from "./FormPqr.module.css";
import {
  handleValidation,
  INITIAL_VALUE,
  TYPE_IDENTIFICATION,
  TYPE_REQUEST,
  VALUES_GUEST,
} from "./validateForm";

const FormPqr = () => {
  const router = useRouter();
  const { state, pqrDispatch } = useContext(StoreContext);
  const { pqrState } = state;
  const { loading } = pqrState;
  const [verification, setVerification] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUE);
  const [valuesGuest, setValuesGuest] = useState(VALUES_GUEST);
  const [mode, setMode] = useState("for me");
  const [modalShow, setModalShow] = useState(false);
  const [handleError, setHandleError] = useState({ error: false, msn: "" });

  const onChange = (value) => {
    if (value) {
      setVerification(true);
    }
  };

  const handleSendPqr = async () => {
    const valuesFormComplete = {
      ...values,
      invitePersonalData: mode === "for me" ? null : valuesGuest,
    };
    const { errorValidation, msn } = handleValidation(valuesFormComplete);

    if (errorValidation) {
      setHandleError({
        error: errorValidation,
        msn,
      });
      return;
    }
    if (!verification) {
      setHandleError({
        error: true,
        msn: "Por favor verificar si no eres un robot",
      });
      return;
    }

    const addons = {
      id: util.genereID(),
      idRequest: util.genereIdMin(),
      create: Date.now(),
      status: 0,
    };

    await addRequestDispatch(
      Object.assign(valuesFormComplete, addons),
      pqrDispatch
    );

    setValues(INITIAL_VALUE);

    setModalShow(true);
  };

  const onChangeText = (target, value) => {
    setValues({ ...values, [target]: value });
  };
  const onChangeTextGuest = (target, value) => {
    console.log("target", target);
    console.log("value", value);
    setValuesGuest({ ...valuesGuest, [target]: value });
  };

  const handleMultipleEvidence = (name, file) => {
    NProgress.start();
    const ext = util.get_fileExtension(file.name);
    const storageRef = storage.ref(`saanafarma/@pqr/${util.genereID()}.${ext}`);
    const task = storageRef.put(file);

    try {
      task.on(
        "state_changed",
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("percentage =>", percentage);
        },
        (error) => {
          console.error(error.message);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          addLinkState(name, url);
          NProgress.done();
          NProgress.remove();
        }
      );
    } catch (error) {
      setHandleError({
        error: true,
        msn: "Ocurrió algo inesperado con la subida de archivos. Por favor vuelve a intentarlo",
      });
    }
  };

  const addLinkState = (name, value) => {
    setValues({
      ...values,
      evidence: [
        ...values.evidence,
        {
          [`${name}_${values.evidence.length + 1}`]: value,
        },
      ],
    });
  };
  const handleCloseModal = () => {
    setModalShow(false);
    router.push("/");
  };
  const handleExpired = () => {
    setVerification(false);
    setHandleError({
      error: true,
      msn: "La verificación caduco. Vuelve a marcar la casilla de verificación",
    });
  };
  return (
    <>
      <Error
        msn={handleError.msn}
        open={handleError.error}
        setHandleError={setHandleError}
      />
      <div className={styles.containerForm}>
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
          <div className={styles.form}>
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
                name={"typeRequest"}
                onChange={(e) => onChangeText("typeDocument", e.target.value)}
              >
                {TYPE_IDENTIFICATION.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
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
                    name={"name"}
                    value={valuesGuest.name}
                    onChange={(e) =>
                      onChangeTextGuest(e.target.name, e.target.value)
                    }
                  />
                  <input
                    placeholder={"Teléfono"}
                    className={styles.input}
                    name={"phone"}
                    value={valuesGuest.phone}
                    onChange={(e) =>
                      onChangeTextGuest(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className={styles.colInput}>
                  <input
                    placeholder={"Dirección"}
                    className={styles.input}
                    name={"address"}
                    value={valuesGuest.address}
                    onChange={(e) =>
                      onChangeTextGuest(e.target.name, e.target.value)
                    }
                  />
                  <input
                    placeholder={"Nit o cedula"}
                    className={styles.input}
                    name={"ci"}
                    value={valuesGuest.ci}
                    onChange={(e) =>
                      onChangeTextGuest(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className={styles.colInput}>
                  <input
                    placeholder={"Ciudad"}
                    name={"city"}
                    value={valuesGuest.city}
                    onChange={(e) =>
                      onChangeTextGuest(e.target.name, e.target.value)
                    }
                    className={styles.input}
                  />
                  <input
                    placeholder={"Email"}
                    className={styles.input}
                    name={"email"}
                    value={valuesGuest.email}
                    onChange={(e) =>
                      onChangeTextGuest(e.target.name, e.target.value)
                    }
                  />
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
              {TYPE_REQUEST.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
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
                otros). Permite adjuntar archivos máximo de 2 MB en formatos
                pdf, jpg y png.
              </p>
            </div>
            <h4 className={styles.titleSection}>
              Documentos <span className={styles.textGray}>{"(OPCIONAL)"}</span>
            </h4>

            <input
              type={"file"}
              accept={".pdf, .jpg"}
              multiple
              onChange={(e) =>
                handleMultipleEvidence("evidence", e.target.files[0])
              }
            />
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
                <a
                  className={styles.link}
                  onClick={() => util.openWebTab(TRATAMIENTO_DATOS)}
                >
                  política de tratamiento de datos personales
                </a>
              </label>
            </div>
            <div>
              <a>
                Los tiempos de respuesta de acuerdo al tipo de solicitud los
                puede consultar en el siguiente enlace :{" "}
                <a
                  className={styles.link}
                  href={
                    "https://www.procuraduria.gov.co/relatoria/media/file/DirectivaDDH/L-1755-2015.pdf"
                  }
                  target={"blank"}
                >
                  LEY 1755 DE 2015
                </a>
              </a>
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
              onExpired={() => handleExpired()}
            />
            <button
              onClick={() => handleSendPqr()}
              className={
                styles.buttonSend //styles.disabledButton
              }
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Crear Solicitud "
              )}
            </button>
          </div>
        </div>

        <Modal show={modalShow} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className={styles.iconCheck}>
                <IconCheck />
              </div>
              <p>
                Se a creado satisfactoriamente tu solicitud, te hemos enviado un
                correo con tu número de radicado
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default FormPqr;
