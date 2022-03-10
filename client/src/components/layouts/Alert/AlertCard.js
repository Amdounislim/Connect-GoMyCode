import React from "react";

const AlertCard = ({ alert: { msg, alertType, id }, clearAlert }) => {
  return (
    <li className="alert-card fade-in" onClick={() => clearAlert(id)}>
      <p>{msg}</p>
      {alertType === "warning" ? (
        <i className="far fa-exclamation-circle warning" />
      ) : alertType === "success" ? (
        <i class="fas fa-check-circle success"></i>
      ) : null}
    </li>
  );
};

export default AlertCard;
