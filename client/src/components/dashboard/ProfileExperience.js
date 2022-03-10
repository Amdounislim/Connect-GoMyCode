import React, { Fragment } from "react";
import Moment from "react-moment";
import AddExperience from "../dashboard-modals/AddExperienceModal";

const ProfileExperience = ({ profile, addExperience, deleteInfo }) => {
  return (
    <Fragment>
      {profile && profile.experiences && profile.experiences[0] ? (
        <div
          className="container-icone-user col-10"
          style={{ flexDirection: "column" }}
        >
          <AddExperience addExperience={addExperience} />
          <h4 style={{ margin: "10px 0" }}>
            <i className="fas fa-user-tie" /> Experiences
          </h4>
          {profile.experiences.map(exp => (
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
                  {exp.title} at {exp.company} : {exp.location}
                </p>

                <p className="text-small">
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
                  {exp.current ? (
                    "Now"
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                </p>
              </div>
              <i
                className="fas fa-trash remove-btn"
                onClick={() =>
                  deleteInfo(exp._id, "experiences", "Experience Deleted")
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
            <h3 style={{ margin: "10px 0" }}>Experience</h3> Add Your Experience
            inofrmations <AddExperience addExperience={addExperience} />{" "}
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProfileExperience;
