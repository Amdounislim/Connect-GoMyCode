import React, { useState, Fragment, useEffect } from "react";
import Modal from "../layouts/Modal/Modal";

export default function AddScore({
  onSubmit = () => {},
  id,
  certif: { checkpoint, onetoone, _id: gmc_id }
}) {
  useEffect(() => {
    setFormData({
      checkpoint: checkpoint || 50,
      onetoone: onetoone || 50
    });
  }, []);
  const [isShow, setShow] = useState(false);
  const [formData, setFormData] = useState({
    checkpoint: 50,
    onetoone: 50
  });

  const setIsOpen = ele => {
    setShow(ele);
  };
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <i
        className="fas fa-pen"
        onClick={() => setShow(true)}
        style={{ cursor: "pointer" }}
      />

      <Modal isOpen={isShow} setIsOpen={setIsOpen}>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(id, gmc_id, formData);
            setIsOpen(false);
          }}
          className="stats-form form"
          style={{
            padding: "1rem",
            height: "300px",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "380px"
          }}
        >
          <h3>General Stats</h3>
          <label style={{ margin: "10px 0 5px" }}>
            {" "}
            {`Avreage Checkpoint score ${formData.checkpoint}%`}
          </label>
          <input
            type="range"
            required
            name="checkpoint"
            value={formData.checkpoint}
            onChange={handleChange}
          />
          <label
            style={{ margin: "10px 0 5px" }}
          >{`Avreage One-To-One score ${formData.onetoone}%`}</label>
          <input
            type="range"
            required
            name="onetoone"
            value={formData.ontoone}
            onChange={handleChange}
          />
          <input type="submit" value="Confirm" />
        </form>
      </Modal>
    </Fragment>
  );
}
