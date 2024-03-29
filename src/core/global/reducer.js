import createReducer from "../createReducer";
import {
  HANDLE_ERROR_GLOBAL,
  LOADING_GLOBAL,
  ADD_CART,
  SHOW_CART,
  CREATE_CHECKOUT,
  SET_USER,
  HANDLE_MODAL_LOGIN,
  SET_COORDINATES,
  SET_DELETE_CHECKOUT,
} from "./types";

export const INITIAL_STATE_GLOBAL = {
  errorMsn: "",
  error: false,
  loading: false,
  cart: [],
  showCart: false,
  checkout: { lineItems: { edges: [] } },
  modalLogin: false,
  coordinates: null,
};
const handleError = (state, action) => {
  const { error, errorMsn } = action.payload;
  return {
    ...state,
    error,
    errorMsn,
  };
};

const setLoading = (state, action) => {
  return {
    ...state,
    loading: action.payload,
  };
};
const addCart = (state, action) => {
  return {
    ...state,
    cart: action.payload,
  };
};
const handleModal = (state, action) => {
  return {
    ...state,
    showCart: action.payload,
  };
};
const createCheckout = (state, action) => {
  return {
    ...state,
    checkout: action.payload,
  };
};
const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};
const handleModalLogin = (state, action) => {
  return {
    ...state,
    modalLogin: action.payload,
  };
};
const setCoordinates = (state, action) => {
  return {
    ...state,
    coordinates: action.payload,
  };
};
const checkoutInitialState = (state) => {
  return {
    ...state,
    checkout: { lineItems: { edges: [] } },
  };
};
export default createReducer(INITIAL_STATE_GLOBAL, {
  [HANDLE_ERROR_GLOBAL]: handleError,
  [LOADING_GLOBAL]: setLoading,
  [ADD_CART]: addCart,
  [SHOW_CART]: handleModal,
  [CREATE_CHECKOUT]: createCheckout,
  [SET_USER]: setUser,
  [HANDLE_MODAL_LOGIN]: handleModalLogin,
  [SET_COORDINATES]: setCoordinates,
  [SET_DELETE_CHECKOUT]: checkoutInitialState,
});
