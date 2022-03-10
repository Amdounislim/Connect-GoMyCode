import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileExperience = ({ style, experience }) => {
  return (
    <div style={style} className="experience-container">
      {experience.map(
        ({ title, location, current, company, from, to, description }) => (
          <div className="profileCard" style={{ margin: "1rem" }}>
            <img
              src="https://ga-profiles-production-herokuapp-com.global.ssl.fastly.net/assets/timeline/event_work-63fd128fbe810360988c87a6a2f7efcf.png"
              alt=""
              className="src"
            />
            <h3>{`${title} at ${company}`}</h3>
            <div className="col-12">
              <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                {current ? (
                  "Now"
                ) : (
                  <Fragment>
                    <Moment format="YYYY/MM/DD">{to}</Moment>
                  </Fragment>
                )}{" "}
              </p>

              <p>
                <strong>Location: </strong>
                {location}
              </p>
              {description && (
                <p>
                  <strong>Description: </strong>
                  {description}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProfileExperience;
