import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAccount } from "../../js/actions/authActions";
import "./EditAccount.css";

const EditAccount = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { loading, user, isAuth } = auth;
  const [isHidden, setIsHidden] = useState(true);
  const [isDisable, setisDisable] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  });
  useEffect(() => {
    setFormData({
      name: loading ? "" : user.name,
      lastName: loading ? "" : user.lastName,
      email: loading ? "" : user.email,
      phone: loading ? "" : user.phone
    });
  }, [loading]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditPassword = e => {
    setisDisable(!e.target.checked);
    setFormData({
      ...formData,
      newPassword: "",
      currentPassword: ""
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editAccount(formData, history));
  };

  const viewPassword = e => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="col-6 mr-auto">
      <form className="form" onSubmit={handleSubmit}>
        <h5>
          <i className="fas fa-user"></i> Edit Your Account
        </h5>

        <input
          onChange={handleChange}
          placeholder="Your name"
          name="name"
          value={formData.name}
          type="text"
          autoFocus
        />
        <input
          onChange={handleChange}
          placeholder="Your last name"
          name="lastName"
          value={formData.lastName}
          type="text"
          autoFocus
        />

        <input
          onChange={handleChange}
          placeholder="Your Email Address"
          name="email"
          value={formData.email}
          type="email"
        />

        <input
          onChange={handleChange}
          placeholder="Your Phone Number"
          name="phone"
          value={formData.phone}
          type="tel"
        />
        <div className="password-edit-container">
          <label>
            Edit passord{"  "}
            <input type="checkbox" onChange={handleEditPassword} />
          </label>
          {!isDisable && (
            <i
              class={isHidden ? "far fa-eye-slash" : "far fa-eye"}
              onClick={viewPassword}
            ></i>
          )}
        </div>
        {!isDisable && (
          <Fragment>
            <input
              onChange={handleChange}
              placeholder="Your Old Password"
              name="currentPassword"
              value={formData.currentPassword}
              type={isHidden ? "password" : "text"}
              disabled={isDisable}
            />

            <input
              onChange={handleChange}
              placeholder="You New Password Password"
              name="newPassword"
              value={formData.newPassword}
              disabled={isDisable}
              type={isHidden ? "password" : "text"}
            />
          </Fragment>
        )}
        <input name="submit" type="submit" id="contact-submit" value="Submit" />
        <Link to="/dashboard">
          <input type="submit" className="cancel-btn" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default EditAccount;
