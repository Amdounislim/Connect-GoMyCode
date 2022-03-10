import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../js/actions/authActions";
import "./forms.css";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (auth.isAuth && auth.user.role === "admin") {
    return <Redirect to="/admin/dashboard" />;
  }
  if (auth.isAuth && auth.user.role === "user") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="showcase-login">
      <div className="col-5">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Login</h4>
          <h5>
            <i className="fas fa-user"></i> Login here
          </h5>

          <input
            onChange={handleChange}
            placeholder="Your Email Address"
            name="email"
            value={formData.email}
            type="email"
            required
            autoComplete="username"

          />

          <input
            onChange={handleChange}
            placeholder="Your Password"
            name="password"
            value={formData.password}
            type="password"
            required
            autoComplete="current-password"
          />

          <input
            name="submit"
            type="submit"
            id="contact-submit"
            value="Submit"
          />

          <p className="text-small-form">
            You dont have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
