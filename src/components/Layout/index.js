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
import {
  getUserDispatch,
  KEY_SECRET,
  setLoading,
} from "../../core/auth/actions";
import { getAffiliationsPackages } from "../../core/packages/actions";
import Loading from "../Loading";

const Layout = ({ children }) => {
  const router = useRouter();
  let { t: tokenParams } = router?.query;

  const { state, globalDispatch, authDispatch, packageDispatch } =
    useContext(StoreContext);
  const { authState, globalState } = state;
  const { showCart } = globalState;
  const { user, loading } = authState;

  const [token, setToken] = useState("");

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
    } catch (error) {
      console.log("error", error);
    }
  }, [token, tokenParams]);

  const loginSubscriptionParams = useCallback(() => {
    try {
      if (tokenParams) {
        const { id = "" } = jwt.verify(tokenParams, KEY_SECRET);
        getUserDispatch(id, authDispatch);
      }
    } catch (error) {
      console.log("error:loginSubscriptionParams", error);
    }
  }, [tokenParams]);

  const handleSearchPackage = useCallback(async () => {
    if (user) {
      setLoading(true, authDispatch);
      await getAffiliationsPackages(user.id.toString(), packageDispatch);
      setLoading(false, authDispatch);
    }
  }, [user]);

  useEffect(() => {
    loginSubscription();
  }, [loginSubscription]);

  useEffect(() => {
    loginSubscriptionParams();
  }, [loginSubscriptionParams]);

  useEffect(() => {
    handleSearchPackage();
  }, [handleSearchPackage]);

  if (loading) {
    return <Loading />;
  }

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
