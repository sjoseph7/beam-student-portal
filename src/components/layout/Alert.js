import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

//TODO: Refactor with Container
const Alert = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        {alert.message}
      </div>
    ))
  );
};

export default Alert;
