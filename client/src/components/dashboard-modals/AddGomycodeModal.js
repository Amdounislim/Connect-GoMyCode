import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import gmcicon from "../../images/favicon.png";
import Modal from "../layouts/Modal/Modal";
import "./Modal.css";

const AddGomycode = ({ addGomycode, history }) => {
  const [formData, setFormData] = useState({
    track: "",
    from: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const { track, from } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <div className="col-6 mr-auto">
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
              addGomycode(formData, history);
              setIsOpen(false);
            }}
          >
            <div className="modal-header">
              <h3>
                <img alt="gomycode" src={gmcicon} /> Add any certificate you got
                from GoMyCode
              </h3>
            </div>
            <select name="track" value={track} onChange={onChange}>
              <option>* Select a Track</option>
              <option>Full-Stack js</option>
              <option>Data-Siences</option>
              <option>Game development</option>
            </select>
            <div>
              <p>From Date</p>
              <input type="date" name="from" value={from} onChange={onChange} />
            </div>
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
      </div>
    </Fragment>
  );
};

AddGomycode.propTypes = {
  addGomycode: PropTypes.func.isRequired
};

export default AddGomycode;
