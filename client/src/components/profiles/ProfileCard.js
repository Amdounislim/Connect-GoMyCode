import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../dashboard/Avatar";
import "./ProfileCard.css";

export default function ProfileCard({
  profile: {
    name,
    lastName,
    status,
    studies,
    experience,
    skills,
    location,
    _id
  }
}) {
  return (
    <Link to={`/profile/${_id}`} style={{ color: "inherit" }}>
      <div className="profileCard">
        <p
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "rgba(0,0,0,0.5)"
          }}
        >
          <i className="fa fa-map-marker-alt" />
          {location.toUpperCase()}
        </p>
        {/* https://profiles.generalassemb.ly/profiles */}
        <Avatar
          style={{
            margin: "0 3rem 0 0",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.2)"
          }}
          id={_id}
        />
        <div className="col-8">
          <h2>{`${name} ${lastName}`}</h2>
          <h4>{status}</h4>
          <div>
            {experience && experience.company && (
              <div className="workExperince">
                <div className="work-icon">
                <i class="fa fa-briefcase"/>
                </div>
                <div className="work-details">
                  {experience.current ? (
                    <p>
                      Working as {experience.title} at {experience.company}
                    </p>
                  ) : (
                    <p>Previously working with {experience.company}</p>
                  )}
                </div>
              </div>
            )}
            {studies && studies.school && (
              <div className="education">
                <div className="education-icon">
                <i class="fa fa-graduation-cap"/>
                </div>
                <div className="education-details">
                  <p>{`${studies.degree} of ${studies.fieldofstudy} at ${studies.school}`}</p>
                </div>
              </div>
            )}
            {skills && skills[0] && (
              <div className="skills">
                <div className="skills-icon">
                  <i className="fas fa-code" />
                </div>
                <div className="skills-details">
                  <p>
                    {" "}
                    {skills.map((skill, i) =>
                      i !== 0
                        ? " , " + skill.toUpperCase()
                        : skill.toUpperCase()
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
