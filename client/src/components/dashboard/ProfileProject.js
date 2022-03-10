import React, { Fragment } from "react";
import AddProject from "../dashboard-modals/AddProjectModal";

const ProfileProject = ({ profile, addProject, deleteInfo }) => {
  return (
    <Fragment>
      {profile && profile.projects && profile.projects[0] ? (
        <div
          className="container-icone-user col-10"
          style={{ flexDirection: "column" }}
        >
          <AddProject addProject={addProject} />
          <h4 style={{ margin: "10px 0" }}>
            <i className="fab fa-github" /> Projects
          </h4>
          {profile.projects.map(project => (
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
                <p>{project.title}</p>

                <p className="text-small">{project.githubLink}</p>
              </div>
              <i
                className="fas fa-trash remove-btn"
                onClick={() =>
                  deleteInfo(project._id, "projects", "Project Deleted")
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
            <h3 style={{ margin: "10px 0" }}>Projects</h3> Add Your Projects{" "}
            <AddProject addProject={addProject} />{" "}
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProfileProject;
