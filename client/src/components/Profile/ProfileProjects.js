import React from "react";
import Pcard from "./ProjectCard";

const ProfileProjects = ({ style, projects }) => {
  return (
    <div className="project-container fade-in" style={style}>
      {projects.map(project => (
        <Pcard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProfileProjects;
