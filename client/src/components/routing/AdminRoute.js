import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../layouts/Spinner/Spinner";

const AdminRoute = ({
  component: Component,
  auth: { isAuth, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinner />
      ) : !loading && isAuth && user && user.role === "admin" ? (
        <Component {...props} />
      ) : !loading && isAuth && user && user.role !== "admin" ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
