import React, { Fragment } from "react";
import Moment from "react-moment";
import AddEducation from "../dashboard-modals/AddEducationModal";

const ProfileEducation = ({ profile, addEducation, deleteInfo }) => {
  return (
    <Fragment>
      {profile && profile.education && profile.education[0] ? (
        <div
          className="container-icone-user col-10"
          style={{ flexDirection: "column" }}
        >
          <AddEducation addEducation={addEducation} />
          <h4 style={{ margin: "10px 0" }}>
            <i className="fa fa-user-graduate" /> Education
          </h4>
          {profile.education.map(edu => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "80%",
                borderBottom: "1px solid  #e8e8e8",

                padding: "0 1rem"
              }}
            >
              <div>
                <p>
                  {edu.school}-{edu.degree} : {edu.fieldofstudy}
                </p>

                <p className="text-small">
                  <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{" "}
                  {edu.current ? (
                    "Now"
                  ) : (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                  )}
                </p>
              </div>
              <i
                className="fas fa-trash remove-btn"
                onClick={() =>
                  deleteInfo(edu._id, "education", "Education Deleted")
                }
              />
            </div>
          ))}
        </div>
      ) : (
        profile !== null && (
          <div
            className="container-icone-user col-10"
            style={{ flexDirection: "column" }}
          >
            <h3 style={{ margin: "10px 0" }}>Education</h3> Add Your Education
            inofrmations <AddEducation addEducation={addEducation} />{" "}
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProfileEducation;
