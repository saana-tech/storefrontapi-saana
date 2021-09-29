import React, { useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import jwt from "jsonwebtoken";
import ModalCart from "../ModalCart";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Whatsapp from "../Whatsapp";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { StoreContext } from "../../core";
import { handleGeoLocation } from "../../core/global/actions";
// import { getAffiliationsPackages } from "../../core/packages/actions";
import { useQuery } from "@apollo/client";
import {
  getUserAuth,
  getUserDispatch,
  setLoading,
} from "../../core/auth/actions";
import { getQueryUser } from "../../graphql/auth";

const KEY_SECRET = process.env.NEXT_PUBLIC_KEY_SECRET;

const Layout = ({ children }) => {
  const router = useRouter();
  let { t: tokenParams } = router?.query;

  const { state, globalDispatch, authDispatch } = useContext(StoreContext);
  const { authState, globalState } = state;
  const { showCart } = globalState;
  const { user, loading, token } = authState;
  const { data = null, refetch } = useQuery(getQueryUser);

  // const handleToken = () => {
  //   setToken(localStorage.getItem("token"));
  // };
  // useEffect(() => {
  //   handleToken();
  // }, [handleToken]);

  const handleSubscriptionUser = useCallback(() => {
    const user = data?.getUser;
    if (user) {
      getUserAuth(user, authDispatch);
    }
  }, [data?.getUser]);

  useEffect(() => {
    handleSubscriptionUser();
  }, [handleSubscriptionUser]);

  useEffect(async () => {
    if (token) {
      await refetch();
      handleSubscriptionUser();
    }
  }, [token]);

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
      // await getAffiliationsPackages(user._id.toString(), packageDispatch);
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
