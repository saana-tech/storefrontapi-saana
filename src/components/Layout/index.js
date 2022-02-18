import React, { useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ModalCart from "../ModalCart";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Whatsapp from "../Whatsapp";
import Loading from "../Loading";
import { StoreContext } from "../../core";
import { handleGeoLocation } from "../../core/global/actions";
import { useQuery } from "@apollo/client";
import { getUserAuth } from "../../core/auth/actions";
import { getQueryUser } from "../../graphql/auth";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { state, globalDispatch, authDispatch } = useContext(StoreContext);
  const { authState, globalState } = state;
  const { showCart } = globalState;
  const { loading, token } = authState;
  const { data = null, refetch } = useQuery(getQueryUser);
  const router = useRouter();

  const handleSubscriptionUser = useCallback(() => {
    const token = router?.query?.t;
    localStorage.setItem("token", token);
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
