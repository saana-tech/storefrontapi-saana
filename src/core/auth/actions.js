import jwt from "jsonwebtoken";
import { ERROR, GET_TOKEN, LOADING, SET_USER } from "./types";

export const KEY_SECRET = process.env.NEXT_PUBLIC_KEY_SECRET;

export const handleError = (payload, dispatch) => {
  setLoading(false, dispatch);
  dispatch({ type: ERROR, payload });

  setTimeout(() => {
    const payload = { error: false, errorMsn: "" };
    dispatch({ type: ERROR, payload });
  }, 4000);
};
export const setLoading = (loading, dispatch) => {
  dispatch({ type: LOADING, payload: loading });
};

export const handleTokenLoginVerify = (token) => {
  localStorage.setItem("token", token);

  try {
    const { id = "" } = jwt.verify(token, KEY_SECRET);
    return id;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_shopify");
    console.log("error:handleTokenLoginVerify", error);

    return false;
  }
};

export const singOffDispatch = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: SET_USER,
    payload: null,
  });
};

export const setToken = (token, dispatch) => {
  dispatch({
    type: GET_TOKEN,
    payload: token,
  });
};

export const getUserAuth = async (user, dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};
