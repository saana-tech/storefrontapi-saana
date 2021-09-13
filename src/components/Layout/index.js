import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

import { StoreContext } from "../../core";
import ModalCart from "../ModalCart";

import NavBar from "../NavBar";
import Footer from "../Footer";
import Whatsapp from "../Whatsapp";
import { handleGeoLocation } from "../../core/global/actions";
import { getUserDispatch, KEY_SECRET } from "../../core/auth/actions";

const Layout = ({ children }) => {
  const router = useRouter();
  let { t } = router.query;

  const { state, globalDispatch, authDispatch } = useContext(StoreContext);
  const { globalState, authState } = state;
  const { showCart } = globalState;
  const { user } = authState;

  const [token, setToken] = useState("");
  console.log("user", user);
  console.log("token", token);

  const handleToken = () => {
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    handleToken();
  }, [handleToken]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      handleGeoLocation(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        globalDispatch
      );
    });
  }, []);

  const loginSubscription = useCallback(async () => {
    try {
      if (token) {
        const { id = "" } = jwt.verify(token, KEY_SECRET);
        if (id) {
          getUserDispatch(id, authDispatch);
        }
      }
      if (t) {
        const { id = "" } = jwt.verify(token, KEY_SECRET);
        getUserDispatch(id, authDispatch);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [token, t]);

  useEffect(() => {
    loginSubscription();
  }, [loginSubscription]);

  return (
    <div>
      {showCart && <ModalCart />}
      <NavBar />
      <div className="container-principal">{children}</div>
      <Whatsapp />

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Layout;
