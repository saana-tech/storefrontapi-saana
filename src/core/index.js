import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import globalReducer, { INITIAL_STATE_GLOBAL } from "./global/reducer";
import pqrReducer, { INITIAL_STATE_PQR } from "./Pqr/reducer";

export const StoreContext = createContext({});

const Store = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    INITIAL_STATE_GLOBAL
  );
  const [pqrState, pqrDispatch] = useReducer(pqrReducer, INITIAL_STATE_PQR);

  return (
    <StoreContext.Provider
      value={{
        state: { globalState, pqrState },
        globalDispatch,
        pqrDispatch,
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
