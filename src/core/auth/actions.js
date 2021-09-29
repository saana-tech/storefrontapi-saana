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

// export const handleLoginDispatch = async (dataUser, dispatch) => {
//   const url = "https://saana-api-prod-7xk7iwgpfq-uc.a.run.app/v1/login";
//   try {
//     setLoading(true, dispatch);
//     const { data } = await clientAxios.post(url, dataUser);

//     const { token, _error } = data;
//     console.log("data:handleLoginDispatch", data);

//     if (_error && _error.code === 152) {
//       handleError(
//         { error: true, errorMsn: "Las credenciales son incorrectas." },
//         dispatch
//       );
//       return;
//     }
//     if (_error && _error.code === 152) {
//       handleError({ error: true, errorMsn: "El usuario no existe!" }, dispatch);
//       return;
//     }
//     if (_error && _error.code === 105) {
//       handleError(
//         { error: true, errorMsn: "El usuario no existe en base de datos!" },
//         dispatch
//       );
//       return;
//     }
//     if (_error && _error.code === 104) {
//       handleError(
//         { error: true, errorMsn: "El usuario no existe en base de datos!" },
//         dispatch
//       );
//       return;
//     }
//     localStorage.setItem("token", token);

//     const { id = "" } = jwt.verify(token, KEY_SECRET);
//     if (id) {
//       await getUserDispatch(id, dispatch);
//     }

//     setLoading(false, dispatch);
//   } catch (error) {
//     setLoading(false, dispatch);
//     console.log("error:handleLogin =>", error);
//   }
// };
export const handleTokenLoginVerify = (token) => {
  console.log("token :handleTokenLoginVerify=>", token);
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
// export const getUserDispatch = async (id, dispatch) => {
//   console.log("data:handleLoginDispatch:id", id);

//   try {
//     setLoading(true, dispatch);
//     const { data } = await clientAxios(`/v1/usuarios/${id}`);
//     const { _error = null } = data;
//     console.log("data:handleLoginDispatch", data);

//     if (_error && _error.code === 152) {
//       singOffDispatch(dispatch);
//       handleError({ error: true, errorMsn: "El usuario no existe!" }, dispatch);
//       return;
//     }
//     if (_error && _error.code === 105) {
//       singOffDispatch(dispatch);

//       handleError(
//         { error: true, errorMsn: "El usuario no existe en base de datos!" },
//         dispatch
//       );
//     }
//     if (_error && _error.code === 104) {
//       singOffDispatch(dispatch);

//       handleError(
//         { error: true, errorMsn: "El usuario no existe en base de datos!" },
//         dispatch
//       );
//       return;
//     }
//     dispatch({
//       type: SET_USER,
//       payload: data,
//     });
//     setLoading(false, dispatch);
//   } catch (error) {
//     setLoading(false, dispatch);
//     console.log("error:getUserDispatch", error);
//   }
// };
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
