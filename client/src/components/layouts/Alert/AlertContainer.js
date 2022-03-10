import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAlert } from "../../../js/actions/alertActions";
import AlertCard from "./AlertCard";
import "./Alert.css";

const AlertContainer = () => {
  const alerts = useSelector(state => state.alert);
  const dispatch = useDispatch();
  const clearAlert = id => dispatch(closeAlert(id));

  return (
    <ul className="alert-container">
      {alerts.map((alert, i) => (
        <AlertCard key={i} alert={alert} clearAlert={clearAlert} />
      ))}
    </ul>
  );
};

export default AlertContainer;
