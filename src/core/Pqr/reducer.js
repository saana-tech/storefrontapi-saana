import createReducer from "../createReducer";
import { ADD_REQUEST, ERROR, GET_REQUEST, LOADING } from "./types";

export const INITIAL_STATE_PQR = {
  errorMsn: "",
  error: false,
  loading: false,
  listPqr: [],
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
const addRequest = (state, action) => {
  return {
    ...state,
    listPqr: action.payload,
  };
};
export default createReducer(INITIAL_STATE_PQR, {
  [ERROR]: handleError,
  [LOADING]: setLoading,
  [ADD_REQUEST]: addRequest,
  [GET_REQUEST]: addRequest,
});
