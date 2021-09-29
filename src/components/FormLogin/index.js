import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./FormLogin.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";

import Error from "../Error";
import { IMG_LOGIN, IMG_REGISTER, TYC } from "../../constants";
import util from "../../util";
import { handleLoginDispatch, setToken } from "../../core/auth/actions";
import { StoreContext } from "../../core";
import { TYPE_DOCUMENT } from "../FormPqr/validateForm";
import { validateFormRegister } from "../../helper/time";
import { createNewUserGraphQL, validateDocumentInput } from "../../graphql/gql";
import { useMutation } from "@apollo/client";

//Handle login
const FormLogin = ({ close }) => {
  const INITIAL_VALUES = {
    idType: "",
    id: "",
    phone: "",
    firstName: "",
    surname: "",
    email: "",
    password: "",
    tyc: false,
  };

  const { authDispatch } = useContext(StoreContext);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [modeRegister, setModeRegister] = useState(false);
  const [handleError, setHandleError] = useState({ error: false, msn: "" });
  const [createNewClient] = useMutation(createNewUserGraphQL);
  const [validateDocument, { loading }] = useMutation(validateDocumentInput);

  const onChangeText = (target, value) => {
    setValues({ ...values, [target]: value });
  };

  const handleLogin = async (e) => {
    e?.preventDefault();

    console.log("values", values);
    try {
      if (values.email === "" || values.password === "") {
        return setHandleError({
          error: true,
          msn: "Todos los campos son obligatorios, no olvides aceptar términos y condiciones",
        });
      }

      await handleLoginDispatch(
        Object.assign(
          {
            email: values.email,
            password: values.password,
          },
          { profile: "USUARIO" }
        ),
        authDispatch
      );
      setValues(INITIAL_VALUES);
      close();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    try {
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const input = values[key];
          if (input === "" || input === false) {
            return setHandleError({
              error: true,
              msn: `${validateFormRegister(key)}`,
            });
          }
        }
      }

      const { data } = await validateDocument({
        variables: {
          input: {
            type_document: values.id,
            document: values.idType,
          },
        },
      });

      const { error, message } = data?.validateDocumentUser;
      if (!error) {
        const { data } = await createNewClient({
          variables: {
            input: {
              document: values.id,
              email: values.email,
              firstName: values.firstName + values.surname,
              password: values.password,
              phone: values.phone,
              role: "cliente",
              type_document: values.idType,
            },
          },
        });
        const token = data.createNewUserClientController.token;
        localStorage.setItem("token", token);

        setToken(token, authDispatch);
        setValues(INITIAL_VALUES);
        close();
      } else {
        localStorage.removeItem("token");
        setHandleError({
          error: true,
          msn: `${message}`,
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      setHandleError({
        error: true,
        msn: `${error.message}`,
      });
      console.log("error", error);
    }
  };

  return (
    <>
      <Error
        msn={handleError.msn}
        open={handleError.error}
        setHandleError={setHandleError}
      />
      <div className={styles.containerFormContainer}>
        {!modeRegister ? (
          <div className={styles.containerForm}>
            <div className={styles.form}>
              <h2 className={styles.titleModal}>!BIENVENIDOS DE NUEVO!</h2>
              <input
                placeholder={"Correo electrónico *"}
                name={"email"}
                value={values.email}
                onChange={(e) => onChangeText(e.target.name, e.target.value)}
              />
              <input
                type={"password"}
                placeholder={"Contraseña *"}
                name={"password"}
                onChange={(e) => onChangeText(e.target.name, e.target.value)}
                value={values.password}
              />
              {/*     <a className={styles.link}>¿Olvido tu contraseña?</a> */}
              <div className={styles.buttons}>
                <button onClick={() => handleLogin()}>Iniciar sesión</button>
                <button onClick={() => setModeRegister(true)}>
                  Crear cuenta
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.containerFormRegistre}>
            <div className={styles.contentRegistre}>
              <button
                className={styles.buttonLeft}
                onClick={() => setModeRegister(false)}
              >
                <ArrowLeft />
              </button>
              <h2 className={styles.titleModal}>!ENCANTADO DE CONOCERTE!</h2>
              <form className={styles.formRegistre} onSubmit={handleRegister}>
                <select
                  name={"idType"}
                  value={values.idType}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                >
                  {TYPE_DOCUMENT.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className={styles.userName}>
                  <input
                    type={"number"}
                    placeholder={"Identificación *"}
                    name={"id"}
                    value={values.id}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type={"tel"}
                    placeholder={"Celular *"}
                    name={"phone"}
                    value={values.phone}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className={styles.userName}>
                  <input
                    type={"text"}
                    placeholder={"Nombres *"}
                    name={"firstName"}
                    value={values.firstName}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type={"text"}
                    placeholder={"Apellidos *"}
                    name={"surname"}
                    value={values.surname}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                </div>
                <input
                  type={"email"}
                  placeholder={"Email *"}
                  name={"email"}
                  value={values.email}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                />
                <input
                  type={"password"}
                  placeholder={"Contraseña *"}
                  name={"password"}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                  value={values.password}
                />
                <div className={styles.check}>
                  <input
                    type={"checkbox"}
                    onChange={() => onChangeText("tyc", !values.tyc)}
                  />

                  <label>
                    He leído y acepto los{" "}
                    <a
                      onClick={() => util.openWebTab(TYC)}
                      className={styles.linkTyC}
                    >
                      Términos y condiciones
                    </a>
                  </label>
                </div>
                <button type={"submit"}>Registrarse</button>
              </form>
            </div>
          </div>
        )}
        <div
          className={styles.banner}
          style={{
            backgroundImage: `url(${modeRegister ? IMG_REGISTER : IMG_LOGIN})`,
          }}
        ></div>
      </div>
    </>
  );
};
FormLogin.propTypes = {
  close: PropTypes.func,
};
export default FormLogin;
