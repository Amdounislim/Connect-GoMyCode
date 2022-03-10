import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "../layouts/Modal/Modal";
import "./Modal.css";

const AddProject = ({ addProject }) => {
  const [formData, setFormData] = useState({
    title: "",
    githubLink: "",
    description: "",
    image: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const { title, githubLink, description, image } = formData;

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
            addProject(formData);
            setIsOpen(false);
          }}
        >
          <div className="modal-header">
            <h3>
              <i class="fab fa-github "></i> Add any github repository
            </h3>
          </div>
          <input
            type="text"
            placeholder="* Project Title"
            name="title"
            onChange={onChange}
            value={title}
            required
          />
          <input
            type="text"
            placeholder="* Github Link"
            name="githubLink"
            value={githubLink}
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="Image"
            name="image"
            value={image}
            onChange={onChange}
          />
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Project Description"
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

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default AddProject;
