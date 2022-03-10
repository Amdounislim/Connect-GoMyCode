import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "../dashboard/Avatar";
import Modal from "../layouts/Modal/Modal";
import "./Modal.css";

const EditProfile = ({ profile, createProfile, uploadAvatar, user }) => {
  const [formData, setFormData] = useState({
    location: "",
    status: "",
    bio: "",
    linkedin: "",
    github: ""
  });

  const [isEdit, setIsEdit] = useState(false);
  const [localImg, setlocalImg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (profile !== null) {
      setFormData({
        location: !profile.location ? "" : profile.location,
        status: !profile.status ? "" : profile.status,
        bio: !profile.bio ? "" : profile.bio,
        linkedin: !profile.social ? "" : profile.social.linkedin,
        github: !profile.social ? "" : profile.social.github
      });
      setIsEdit(true);
    }
  }, [isOpen, profile]);

  const { location, status, bio, linkedin, github } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleChangeImage = e => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    previewImage(e);
  };
  const previewImage = e => {
    const file = e.target.files;
    const reader = new FileReader();
    const blob = new Blob(file, { type: "application/octet-binary" });
    reader.readAsDataURL(blob);
    reader.onload = e => setlocalImg(e.target.result);
  };

  const submitForm = e => {
    e.preventDefault();
    formData.avatar && uploadAvatar(formData.avatar, localImg);
    createProfile(formData, isEdit);
    setIsOpen(false);
    setIsEdit(false);
  };

  return (
    <Fragment>
      {isEdit && (
        <i
          onClick={() => setIsOpen(true)}
          className="fa fa-pen open-modal"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer"
          }}
        />
      )}
      {!isEdit && (
        <Fragment>
          <button
            style={{
              position: "absolute",
              bottom: "-60px",
              right: "35%",
              cursor: "pointer"
            }}
            onClick={() => setIsOpen(true)}
          >
            GET STARTED
          </button>
        </Fragment>
      )}
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <form onSubmit={submitForm} className="modal-form">
          <div className="modal-header">
            <h3>
              <i class="fas fa-user"></i> Add some changes to your profile
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar id={user._id} localAvatar={localImg} />
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="inputfile"
                onChange={handleChangeImage}
              />
              <label htmlFor="avatar">
                <i className="fas fa-download"></i>
              </label>
            </div>

            <select name="status" value={status} onChange={handleChange}>
              <option>* Select Professional Status</option>
              <option>Developer</option>
              <option>Junior Developer</option>
              <option>Senior Developer</option>
              <option>Manager</option>
              <option>Student or Learning</option>
              <option>Instructor or Teacher</option>
              <option>Intern</option>
              <option>Other</option>
            </select>

            <input
              type="text"
              value={location}
              name="location"
              onChange={handleChange}
              placeholder="Location"
            />

            <textarea
              value={bio}
              name="bio"
              onChange={handleChange}
              placeholder="A short bio of yourself"
            />

            <input
              type="url"
              value={linkedin}
              name="linkedin"
              onChange={handleChange}
              placeholder="Linkedin Profile Link"
            />

            <input
              type="url"
              value={github}
              name="github"
              onChange={handleChange}
              placeholder="Github Profile Link"
            />
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
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default EditProfile;
