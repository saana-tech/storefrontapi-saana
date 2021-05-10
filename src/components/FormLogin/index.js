import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import styles from "./FormLogin.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";
import { handleCreateCheckoutDispatch } from "../../core/global/actions";
import {
  checkoutCustomerAssociate,
  customerAccessTokenCreate,
  customerCreateSchema,
} from "../../graphql/gql";
import { StoreContext } from "../../core";
import Error from "../Error";
import { IMG_LOGIN, IMG_REGISTER, TYC } from "../../constants";
import util from "../../util";

//Handle login
const FormLogin = ({ close }) => {
  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { checkout } = globalState;
  const INITIAL_VALUES = {
    fitsName: "",
    lasName: "",
    email: "",
    password: "",
    tyc: false,
  };
  const [values, setValues] = useState(INITIAL_VALUES);
  const [modeRegister, setModeRegister] = useState(false);
  const [handleError, setHandleError] = useState({ error: false, msn: "" });

  const [customerCreate] = useMutation(customerCreateSchema);
  const [createTokenCustomer] = useMutation(customerAccessTokenCreate);
  const [checkoutCustomer] = useMutation(checkoutCustomerAssociate);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      values.email === "" ||
      values.password === "" ||
      values.fitsName === "" ||
      values.lasName === "" ||
      !values.tyc
    ) {
      setHandleError({
        error: true,
        msn:
          "Todos los campos son obligatorios, no olvides aceptar términos y condiciones",
      });

      return;
    }
    const input = {
      firstName: values.fitsName,
      lastName: values.lasName,
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await customerCreate({ variables: { input } });
      data.customerCreate.userErrors.forEach(function (error) {
        if (error.field) {
          setHandleError({
            error: error.message,
            msn: "Todos los campos son obligatorios",
          });
          return;
        } else {
          setHandleError({
            error: error.message,
            msn: "Todos los campos son obligatorios",
          });
          return;
        }
      });
      await handleLogin();
      close();
    } catch (error) {
      console.log("error createCustomer =>", error);
    }
  };

  const handleLogin = async () => {
    if (values.email === "" || values.password === "") {
      setHandleError({
        error: true,
        msn: "Todos los campos son obligatorios",
      });

      return;
    }
    try {
      const input = {
        email: values.email,
        password: values.password,
      };
      const { data } = await createTokenCustomer({ variables: { input } });
      if (data) {
        const token =
          data.customerAccessTokenCreate.customerAccessToken.accessToken;

        const expireTime =
          data.customerAccessTokenCreate.customerAccessToken.expiresAt;
        localStorage.setItem("token", token);
        localStorage.setItem("expireTime", expireTime);

        const res = await checkoutCustomer({
          variables: {
            checkoutId: checkout.id,
            customerAccessToken: token,
          },
        });

        const dataCart = res.data.checkoutCustomerAssociate.checkout;
        handleCreateCheckoutDispatch(dataCart, globalDispatch);
        close();
      } else {
        data.customerCreate.userErrors.forEach(function (error) {
          if (error.field) {
            setHandleError({
              error: error.message,
              msn: "Todos los campos son obligatorios",
            });
            return;
          } else {
            setHandleError({
              error: error.message,
              msn: "Todos los campos son obligatorios",
            });
            return;
          }
        });
      }
    } catch (error) {
      console.log("error handleLogin", error);
      setHandleError({
        error: true,
        msn: "Ocurrió algo inesperado",
      });
    }
  };
  const onChangeText = (target, value) => {
    setValues({ ...values, [target]: value });
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
              <h2 className={styles.titleModal}>!ENCANTADO DE CONOCERTE!</h2>
              <form className={styles.formRegistre} onSubmit={handleRegister}>
                <div className={styles.userName}>
                  <input
                    type={"text"}
                    placeholder={"Nombre *"}
                    name={"fitsName"}
                    value={values.fitsName}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type={"text"}
                    placeholder={"Apellido *"}
                    name={"lasName"}
                    value={values.lasName}
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
