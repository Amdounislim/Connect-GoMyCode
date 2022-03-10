import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const DashboardAction = () => {
  return (
    <div className="container-task-dashboard">
      <button>
        <i class="fas fa-user-tie"></i>
        <Link to="/add-experience">Add Experience</Link>
      </button>
      <button>
        <i class="fab fa-github"></i>
        <Link to="/add-project">Add project</Link>
      </button>
    </div>
  );
};
export default DashboardAction;
