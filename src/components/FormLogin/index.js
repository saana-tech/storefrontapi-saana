import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styles from "./FormLogin.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";
import { handleCreateCheckoutDispatch } from "../../core/global/actions";
import { CheckoutFragment } from "../../graphql/gql";
import { StoreContext } from "../../core";

const FormLogin = () => {
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
  const IMG_LOGIN =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/image_login.jpg?v=1617368606";
  const IMG_REGISTER =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/Screen_Shot_2021-04-02_at_10.40.22_AM.png?v=1617378109";

  const customerCreateSchema = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
          displayName
          email
        }
      }
    }
  `;
  const customerAccessTokenCreate = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const checkoutCustomerAssociate = gql`
    mutation checkoutCustomerAssociate(
      $checkoutId: ID!
      $customerAccessToken: String!
    ) {
      checkoutCustomerAssociate(
        checkoutId: $checkoutId
        customerAccessToken: $customerAccessToken
      ) {
        userErrors {
          field
          message
        }
        checkout {
          ...CheckoutFragment
        }
      }
    }
    ${CheckoutFragment}
  `;

  const [customerCreate] = useMutation(customerCreateSchema);
  const [createTokenCustomer] = useMutation(customerAccessTokenCreate);
  const [checkoutCustomer] = useMutation(checkoutCustomerAssociate);

  const handleRegister = async (e) => {
    e.preventDefault();
    const input = {
      firstName: values.fitsName,
      lastName: values.lasName,
      email: values.email,
      password: values.password,
    };

    try {
      await customerCreate({ variables: { input } });
      await handleLogin();
    } catch (error) {
      console.log("error createCustomer =>", error);
    }
  };

  const handleLogin = async () => {
    try {
      const input = {
        email: values.email,
        password: values.password,
      };
      const { data } = await createTokenCustomer({ variables: { input } });
      const token =
        data.customerAccessTokenCreate.customerAccessToken.accessToken;

      const expireTime =
        data.customerAccessTokenCreate.customerAccessToken.expiresAt;

      const res = await checkoutCustomer({
        variables: {
          checkoutId: checkout.id,
          customerAccessToken: token,
        },
      });

      const dataCart = res.data.checkoutCustomer.checkout;

      console.log("data sociaty =>", res.data);
      console.log("expireTime =>", expireTime);
      console.log("token =>", token);
      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error handleLogin", error);
    }
  };
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
