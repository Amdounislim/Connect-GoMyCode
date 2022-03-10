import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../js/actions/authActions";
import Avatar from "../../dashboard/Avatar";

const DropDownMenu = ({ user: { name, lastName, role, _id } }) => {
  const dispatch = useDispatch();
  return (
    <li className="dropdown">
      <Link
        className="nav-item avatar"
        to={"/profile/" + _id}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          style={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            margin: "0 5px"
          }}
          id={_id}
        />
        {/* <i className="fa fa-user" /> */}{" "}
        {` ${name.toUpperCase()} ${lastName.toUpperCase()}  `}
        {"  "}
        <i className="fas fa-angle-down" style={{ marginLeft: "5px" }} />
      </Link>

      <div className="dropdown-content">
        <Link to="/dashboard">
          <i className="fas fa-user-circle" /> Dashboard
        </Link>
        {role === "admin" && (
          <Link to="/admin/dashboard">
            <i className="fas fa-columns"></i> Dashboard Admin
          </Link>
        )}
        <Link to="/dashboard/account">
          <i className="fas fa-user-cog" /> Account
        </Link>
        <Link to="/login" onClick={() => dispatch(logout())}>
          <i className="fa fa-sign-out-alt" /> Logout
        </Link>
      </div>
    </li>
  );
};

export default DropDownMenu;
