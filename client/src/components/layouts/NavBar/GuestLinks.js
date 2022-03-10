import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const GuestLinks = () => {
  return (
    <Fragment>
      <li>
        <Link className="nav-item" to="/profiles">
          <i className="fa fa-user-graduate" />{" "} Find Students
        </Link>
      </li>
      <li>
        <Link className="nav-item login" to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className="nav-item register" to="/register">
          Sign up
        </Link>
      </li>
    </Fragment>
  );
};

export default GuestLinks;
