import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import uuid from "uuid";

const AlertState = props => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (message, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { id, type, message }
    });

    // TODO: handle repeat alerts
    // *If alert message is identical, use _repeatAlert()

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

// ==== INITIAL STATES ==== //
const initialState = { alerts: [] };
