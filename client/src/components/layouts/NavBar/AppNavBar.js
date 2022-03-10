import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import UserLinks from "./UserLinks";
import logo from "../../../images/logo-GMC-black.png";
import "./AppNavBar.css";

const AppNavBar = () => {
  const auth = useSelector(state => state.auth);
  return (
    <header>
      <div className="brand-logo-container col-4">
        <Link to="/">
          <img
            className="brand-logo"
            alt="GoMyCode"
            src={logo}
            width="160px"
            height="35px"
          />
        </Link>
      </div>
      <nav className="col-6">
        <ul>
          {!auth.loading && (
            <Fragment>
              {auth.isAuth ? <UserLinks user={auth.user} /> : <GuestLinks />}
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AppNavBar;
