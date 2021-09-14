import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import globalReducer, { INITIAL_STATE_GLOBAL } from "./global/reducer";
import pqrReducer, { INITIAL_STATE_PQR } from "./Pqr/reducer";
import authReducer, { INITIAL_STATE_AUTH } from "./auth/reducer";
import packageReducer, { INITIAL_STATE_PACKAGE } from "./packages/reducer";

export const StoreContext = createContext({});

const Store = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    INITIAL_STATE_GLOBAL
  );
  const [pqrState, pqrDispatch] = useReducer(pqrReducer, INITIAL_STATE_PQR);
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE_AUTH);
  const [packageState, packageDispatch] = useReducer(
    packageReducer,
    INITIAL_STATE_PACKAGE
  );

  return (
    <StoreContext.Provider
      value={{
        state: { globalState, pqrState, authState, packageState },
        globalDispatch,
        pqrDispatch,
        authDispatch,
        packageDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
Store.propTypes = {
  children: PropTypes.object,
};
export default Store;
