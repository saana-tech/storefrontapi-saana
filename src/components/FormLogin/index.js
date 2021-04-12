import React, { useState } from "react";
import styles from "./FormLogin.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";

const FormLogin = () => {
  const INITIAL_VALUES = {
    fitsName: "",
    lasName: "",
    email: "",
    password: "",
    tyc: false,
  };
  const [values, setValues] = useState(INITIAL_VALUES);
  const [modeRegister, setModeRegister] = useState(false);
  const IMG_LOGIN =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/image_login.jpg?v=1617368606";
  const IMG_REGISTER =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/Screen_Shot_2021-04-02_at_10.40.22_AM.png?v=1617378109";

  const handleRegister = (e) => {
    e.preventDefault();
  };
  const handleLogin = () => {};
  const onChangeText = (target, value) => {
    setValues({ ...values, [target]: value });
  };
  return (
    <div className={styles.containerFormContainer}>
      {!modeRegister ? (
        <div className={styles.containerForm}>
          <div className={styles.form}>
            <h2>!BIENVENIDOS DE NUEVO!</h2>
            <input
              placeholder={"Correo electrónico *"}
              name={"email"}
              value={values.email}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
            />
            <input
              placeholder={"Contraseña *"}
              name={"password"}
              onChange={(e) => onChangeText(e.target.name, e.target.value)}
              value={values.password}
            />
            <a className={styles.link}>¿Olvido tu contraseña?</a>
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
            <h2>!ENCANTADO DE CONOCERTE!</h2>
            <form className={styles.formRegistre} onSubmit={handleRegister}>
              <div className={styles.userName}>
                <input
                  type={"text"}
                  placeholder={"Nombre *"}
                  name={"fitsName"}
                  value={values.fitsName}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                />
                <input
                  type={"text"}
                  placeholder={"Apellido *"}
                  name={"lasName"}
                  value={values.lasName}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                />
              </div>
              <input
                type={"email"}
                placeholder={"Email *"}
                name={"email"}
                value={values.email}
                onChange={(e) => onChangeText(e.target.name, e.target.value)}
              />
              <input type={"password"} placeholder={"Contraseña *"} />
              <div className={styles.check}>
                <input
                  type={"checkbox"}
                  onChange={() => onChangeText("tyc", !values.tyc)}
                />

                <label>
                  He leído y acepto los{" "}
                  <a className={styles.linkTyC}>Términos y condiciones</a>
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
  );
};

export default FormLogin;
