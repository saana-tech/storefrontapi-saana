import {
  HANDLE_ERROR_GLOBAL,
  LOADING_GLOBAL,
  ADD_CART,
  SHOW_CART,
  CREATE_CHECKOUT,
  SET_USER,
} from "./types";

export const handleErrorGlobal = (payload, dispatch) => {
  console.log(payload);
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
