import React, { Fragment, useState} from "react";
import PropTypes from "prop-types";
import Modal from "../layouts/Modal/Modal";
import "./Modal.css";

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current
  } = formData;

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
            addEducation(formData);
            setIsOpen(false);
          }}
        >
          <div className="modal-header">
            <h3>
              <i class="fa fa-user-graduate"></i> Add any school that you have
              attended
            </h3>
          </div>
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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
              Current Studies
            </p>
          </div>
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default AddEducation;
