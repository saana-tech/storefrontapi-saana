import createReducer from "../createReducer";
import { ERROR, LOADING, GET_PACKAGES } from "./types";

export const INITIAL_STATE_PACKAGE = {
  errorMsn: "",
  error: false,
  loading: false,
  packages: [],
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
const getPackages = (state, action) => {
  return {
    ...state,
    packages: action.payload,
  };
};

export default createReducer(INITIAL_STATE_PACKAGE, {
  [ERROR]: handleError,
  [LOADING]: setLoading,
  [GET_PACKAGES]: getPackages,
});
