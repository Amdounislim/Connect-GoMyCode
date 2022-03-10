import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileEducation = ({ style, education }) => {
  return (
    <div className="education-container" style={style}>
      {education.map(edu => (
        <div className="profileCard" style={{ margin: "1rem" }}>
          <img
            alt="graduation-logo"
            style={{ float: "right" }}
            src="https://ga-profiles-production-herokuapp-com.global.ssl.fastly.net/assets/timeline/event_education-46c0af242a7e6f4342801a88f4002111.png"
          />
          <h3>{edu.school} </h3>
          <div>
            <p>
              <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{" "}
              {edu.current ? (
                "Now"
              ) : (
                <Fragment>
                  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                </Fragment>
              )}{" "}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field of study: </strong>
              {edu.fieldofstudy}
            </p>
            {edu.description && (
              <p>
                <strong>Description: </strong>
                {edu.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileEducation;
