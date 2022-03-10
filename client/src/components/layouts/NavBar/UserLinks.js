import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";

const UserLinks = ({ user }) => {
  return (
    <Fragment>
      <li>
        <Link className="nav-item" to="/profiles">
          <i className="fa fa-user-graduate" /> Find Students
        </Link>
      </li>
      <DropDownMenu user={user} />
    </Fragment>
  );
};

export default UserLinks;
