import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "../layouts/Modal/Modal";
import "./Modal.css";

const AddSkill = ({ addSkill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    skill: "",
    level: 50
  });
  const { skill, level } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <i
        className="fas fa-plus-circle open-modal"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer"
        }}
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form
          className="modal-form"
          onSubmit={e => {
            e.preventDefault();
            addSkill(formData);
            setIsOpen(false);
          }}
        >
          <div className="modal-header">
            <h3>
              <i class="fas fa-code "></i> Add Your Skills
            </h3>
          </div>
          <input
            type="text"
            placeholder="* Skill"
            name="skill"
            onChange={onChange}
            value={skill}
            required
          />
          <p>Skill Level {level}%</p>
          <input type="range" name="level" value={level} onChange={onChange} />
          <div className="modal-footer">
            <input id="input-submit" type="submit" value="Submit" />
            <input
              type="button"
              value="Go Back"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

AddSkill.propTypes = {
  addSkill: PropTypes.func.isRequired
};

export default AddSkill;
