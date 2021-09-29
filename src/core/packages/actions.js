import axios from "axios";
import { ERROR, GET_PACKAGES, LOADING } from "./types";

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
export const getAffiliationsPackages = async (clientUid, dispatch) => {
  const url =
    "https://us-central1-saana-consulta.cloudfunctions.net/clients-getCurrentPackage";
  try {
    setLoading(true, dispatch);
    const { data } = await axios.post(url, {
      clientUid,
    });
    dispatch({
      type: GET_PACKAGES,
      payload: data.affiliations,
    });
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error", error.response);
  }
};
