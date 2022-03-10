import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../js/actions/authActions";
import { setAlert } from "../../js/actions/alertActions";
import "./forms.css";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    password2: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password2 !== formData.password) {
      return setAlert("Passwords do not match", "warning");
    }
    dispatch(register(formData));
  };

  if (auth.isAuth && auth.user.role === "admin") {
    return <Redirect to="/admin/dashboard" />;
  }
  if (auth.isAuth && auth.user.role === "user") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="showcase-register">
      <div className="col-7"></div>
      <div className="col-5">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Sign Up</h4>
          <h5>
            <i className="fas fa-user"></i> Create Your Account
          </h5>

          <input
            onChange={handleChange}
            placeholder="Your name"
            name="name"
            value={formData.name}
            type="text"
            required
            autofocus
          />
          <input
            onChange={handleChange}
            placeholder="Your last name"
            name="lastName"
            value={formData.lastName}
            type="text"
            required
            autoFocus
          />

          <input
            onChange={handleChange}
            placeholder="Your Email Address"
            name="email"
            value={formData.email}
            type="email"
            required
          />

          <input
            onChange={handleChange}
            placeholder="Your Phone Number"
            name="phone"
            value={formData.phone}
            type="tel"
            required
          />

          <input
            onChange={handleChange}
            placeholder="Your Password"
            name="password"
            value={formData.password}
            type="password"
            required
          />
          <input
            onChange={handleChange}
            placeholder="Confirm Your Password"
            name="password2"
            value={formData.password2}
            type="password"
            required
          />

          <input
            name="submit"
            type="submit"
            id="contact-submit"
            value="Submit"
          />

          <p className="text-small-form">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
