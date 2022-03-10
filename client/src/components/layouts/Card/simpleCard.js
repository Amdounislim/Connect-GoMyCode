import React from "react";
import "./ProfileCard.css";

export default function ProfileCard() {
  return (
    <div className="profileCard">
      <h2>STUDENT NAME</h2>
      <h4>Student rank</h4>
      <div>
        <div className="workExperince">
          <div className="work-icon">
            <img
              src="https://profiles.generalassemb.ly/assets/job-559ce148fd157543f4207c43fbf27c52.png"
              alt="job"
            />
          </div>
          <div className="work-details">
            <p>Previously working with Go My Code</p>
          </div>
        </div>
        <div className="education">
          <div className="education-icon">
            <img
              src="https://profiles.generalassemb.ly/assets/education-db58ef9fabec9a0deee8d3d6a9169229.png"
              alt="education"
            />
          </div>
          <div className="education-details">
            <p>FullStack programming at Go My Code</p>
          </div>
        </div>
      </div>
    </div>
  );
}
