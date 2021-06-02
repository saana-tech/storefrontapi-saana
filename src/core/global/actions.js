import { db } from "../../config/firebase";
import util from "../../util";
import {
  HANDLE_ERROR_GLOBAL,
  LOADING_GLOBAL,
  ADD_CART,
  SHOW_CART,
  CREATE_CHECKOUT,
  SET_USER,
  HANDLE_MODAL_LOGIN,
  SET_COORDINATES,
} from "./types";

export const handleErrorGlobal = (payload, dispatch) => {
  setLoadingGlobal(false, dispatch);
  dispatch({ type: HANDLE_ERROR_GLOBAL, payload });

  setTimeout(() => {
    const payload = { error: false, errorMsn: "" };
    dispatch({ type: HANDLE_ERROR_GLOBAL, payload });
  }, 4000);
};
export const setLoadingGlobal = (loading, dispatch) => {
  dispatch({ type: LOADING_GLOBAL, payload: loading });
};

export const handleAddCartDispatch = (products, dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: products,
  });
};
export const handleShowCartDispatch = (booleanShow, dispatch) => {
  dispatch({
    type: SHOW_CART,
    payload: booleanShow,
  });
};

export const handleCreateCheckoutDispatch = (data, dispatch) => {
  dispatch({
    type: CREATE_CHECKOUT,
    payload: data,
  });
};

export const setUserDispatch = (user, dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};
export const signOffDispatch = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: SET_USER,
    payload: null,
  });
};
export const showModalLoginDispatch = (bool, dispatch) => {
  dispatch({
    type: HANDLE_MODAL_LOGIN,
    payload: bool,
  });
};
export const handleGeoLocation = (coordinates, dispatch) => {
  dispatch({
    type: SET_COORDINATES,
    payload: coordinates,
  });
};

export const handleSaveSearch = async (keyboard) => {
  const id = util.genereID();
  try {
    await db
      .collection("search")
      .doc(id)
      .set({ keyboard, date: new Date(), id });
  } catch (error) {
    console.log("handleSaveSearch:error =>", error);
  }
};
