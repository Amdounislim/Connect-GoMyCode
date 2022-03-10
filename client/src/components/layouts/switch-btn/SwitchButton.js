import React from "react";
import "./switch.css";

const SwitchButton = ({ onClick = () => {}, round = true, isGranted }) => {
  return (
    <label className="switch">
      <input type="checkbox" onClick={onClick} checked={isGranted} />
      <span className={`slider ${round && "round"}`}></span>
    </label>
  );
};

export default SwitchButton;
