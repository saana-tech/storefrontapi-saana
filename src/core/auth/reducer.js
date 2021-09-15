import createReducer from "../createReducer";
import { LOADING, SET_USER, SET_USER_SHOPIFY, GET_GUEST, ERROR } from "./types";

export const INITIAL_STATE_AUTH = {
  errorMsn: "",
  error: false,
  loading: false,
  user: null, //USER_ENTRIES,
  user_shopify: null,
  list_guest: [],
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
const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};
const setUserShopify = (state, action) => {
  return {
    ...state,
    user_shopify: action.payload,
  };
};
const getGuest = (state, action) => {
  return {
    ...state,
    list_guest: action.payload,
  };
};

export default createReducer(INITIAL_STATE_AUTH, {
  [ERROR]: handleError,
  [LOADING]: setLoading,
  [SET_USER]: setUser,
  [SET_USER_SHOPIFY]: setUserShopify,
  [GET_GUEST]: getGuest,
});
