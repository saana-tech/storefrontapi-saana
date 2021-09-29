import { ERROR, LOADING } from "./types";

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
