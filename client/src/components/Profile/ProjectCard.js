import React from "react";
import noImage from "../../images/learning-illustration.png";
// import "./pcard.css";

export default function Pcard({
  project: { title, description, githubLink, image }
}) {
  return (
    <div
      className="profileCard"
      style={{ width: "90%", flexWrap: "wrap", padding: "10px" }}
    >
      <img
        src={image || noImage}
        alt="project"
        style={{ width: "160px", maxHeight: "160px" }}
      />
      <div className="col-7" style={{ padding: "1rem " }}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={githubLink}>Github Link</a>
      </div>
    </div>
  );
}
