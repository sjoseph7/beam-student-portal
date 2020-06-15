import React, { useContext } from "react";
import AlertContext from "../../../context/alert/alertContext";

//TODO: Refactor with Container
const Alert = () => {
  const { alerts } = useContext(AlertContext);
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`m-0 alert alert-${alert.type}`}>
        {alert.message}
      </div>
    ))
  );
};

export default Alert;
