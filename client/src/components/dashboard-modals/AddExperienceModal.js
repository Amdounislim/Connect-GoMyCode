import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../layouts/Modal/Modal";
import "./Modal.css";

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const { title, company, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <i
        onClick={() => setIsOpen(true)}
        className="fas fa-plus-circle open-modal"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer"
        }}
      />
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <form
          className="modal-form"
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData);
            setIsOpen(false);
          }}
        >
          <div className="modal-header">
            <h3>
              <i className="fas fa-user-tie "></i> Add An Experience
            </h3>
          </div>
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            onChange={onChange}
            value={title}
            required
          />
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <div className="from-to-container">
            <div>
              <p>From Date</p>
              <input type="date" name="from" value={from} onChange={onChange} />
            </div>
            <div>
              <p>To Date</p>
              <input
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                disabled={current}
              />
            </div>
            <p>
              <input
                id="input-check"
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                }}
              />{" "}
              Current Job
            </p>
          </div>
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          />
          <div className="modal-footer">
            <input id="input-submit" type="submit" value="Submit" />
            <input
              type="button"
              value="Go Back"
              onClick={() => setIsOpen(false)}
            />{" "}
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default AddExperience;
