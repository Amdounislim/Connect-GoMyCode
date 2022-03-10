import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./js/actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import AppNavBar from "./components/layouts/NavBar/AppNavBar";
import Alert from "./components/layouts/Alert/AlertContainer";
import Landing from "./components/layouts/Landig/Landig";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import Profile from "./components/Profile/Profile";
import EditAccount from "./components/profile-forms/EditAccount";
import Profiles from "./components/profiles/Profiles";
import "./App.css";
import ManageScore from "./components/AdminDashboard/ManageScore";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <Router>
      <AppNavBar />
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/profile/:id" component={ManageScore} />
        <PrivateRoute exact path="/dashboard/account" component={EditAccount} />

        <Route
          exact
          render={() => (
            <section id="profile">
              <h1>Not Found</h1>{" "}
            </section>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
