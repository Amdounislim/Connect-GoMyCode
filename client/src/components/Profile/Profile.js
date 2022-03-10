import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import sortInfo from "../../utils/sortInfo";
import { getProfileById } from "../../js/actions/profileActions";
import ProfileProjects from "./ProfileProjects";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import Avatar from "../dashboard/Avatar";

import "./Profile.css";
import Spinner from "../layouts/Spinner/Spinner";

const Profile = props => {
  const dispatch = useDispatch();
  const profileR = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getProfileById(props.match.params.id));
    return () => {
      dispatch({
        type: "CLEAR_PROFILE"
      });
    };
  }, [props.match.params.id, dispatch]);
  const [menuShow, setMenu] = useState([
    { menu: "projects", isOpen: true },
    { menu: "experience", isOpen: false },
    { menu: "education", isOpen: false }
  ]);

  const toggleActiveMenu = e => {
    setMenu(
      menuShow.map(el =>
        e.target.name === el.menu
          ? { ...el, isOpen: true }
          : { ...el, isOpen: false }
      )
    );
  };

  const showContent = (title, options, display) => {
    let result = options.find(el => el.menu === title);
    return result.isOpen ? { display } : { display: "none" };
  };

  const { profile, loading, avatar } = profileR;

  if (loading) {
    return <Spinner />;
  } else if (!loading && profile === null) {
    return (
      <section id="profile">
        <h1>No Profile</h1>
      </section>
    );
  }
  return (
    <section id="profile" className="fade-in">
      <aside className="profile-general-info col-4">
        <Avatar
          id={profile.user._id}
          avatar={avatar}
          style={{
            borderRadius: "50%",
            width: "200px",
            height: "200px",
            margin: "0.5rem 0",
            boxShadow: "rgba(0, 0, 0, 0.37) 1px 3px 10px 3px"
          }}
        />
        <ul className="profile-info">
          <li>
            <h2 className="text-dark">{`${profile.user.name} ${profile.user.lastName}`}</h2>
          </li>
          <li>
            <p>
              <i className="fa fa-user"></i> {profile.user.email}
            </p>
          </li>
          <li>
            <p>
              <i className="far fa-bookmark"></i> {profile.status}
            </p>
          </li>
          <li>
            <p>
              <i className="fa fa-phone"></i> {profile.user.phone}
            </p>
          </li>
          <li>
            <p>
              <i className="fa fa-map-marker-alt"></i>
              {profile.location}
            </p>
          </li>
          {profile.gomycode && profile.gomycode[0] && (
            <Fragment>
              <hr />
              <li className="info-title text-dark">GOMYCODE Certification</li>

              {profile.gomycode.map(gmc => (
                <li key={gmc._id}>
                  <p>
                    <i className="fa fa-code"></i> {gmc.track} -{" "}
                    <Moment format="YYYY/MM/DD" withTitle={true}>
                      {gmc.from}
                    </Moment>
                  </p>
                  {gmc.onetoone && gmc.checkpoint && (
                    <Fragment>
                      <p style={{ padding: "0.3rem 0rem 0.3rem 1rem " }}>
                        <i className="fa fa-circle"></i>{" "}
                        {"Chekpoint Score : " + gmc.checkpoint + "%"}{" "}
                      </p>
                      <p style={{ padding: "0.3rem 0rem 0.3rem 1rem" }}>
                        <i className="fa fa-circle"></i>{" "}
                        {"One To One Score : " + gmc.onetoone + "%"}{" "}
                      </p>
                    </Fragment>
                  )}
                </li>
              ))}
            </Fragment>
          )}

          {profile.stats && (
            <Fragment>
              <li>Avreage Chekpoint Score : {profile.stats.checkpoint}%</li>
              <li>Avreage One2One Scroe: {profile.stats.checkpoint}%</li>
            </Fragment>
          )}

          {profile.education && profile.education[0] && (
            <Fragment>
              <hr />

              <li className="info-title text-dark"> Studies</li>
              <li>
                {profile.education
                  .sort(
                    (el, next) => el.from.slice(0, 4) - next.from.slice(0, 4)
                  )
                  .sort(el => (!el.current ? 1 : -1))
                  .slice(0, 1)
                  .map(el => (
                    <p>
                      <i className="fa fa-user-graduate"></i> {el.degree} -{" "}
                      {el.fieldofstudy}
                    </p>
                  ))}
              </li>
            </Fragment>
          )}

          {profile.skills && profile.skills[0] && (
            <Fragment>
              <hr />

              <li className="info-title text-dark">Skills</li>
              {profile.skills.map(skill => (
                <li key={skill._id}>
                  {skill.skill}
                  <p className="progress-container">
                    <span
                      className="progress-fill"
                      style={{ width: skill.level + "%" }}
                    ></span>{" "}
                  </p>
                </li>
              ))}
            </Fragment>
          )}

          {profile.social && (
            <Fragment>
              <hr />
              <li className="info-title text-dark">Social</li>
              <li className="profile-social ">
                {profile.social.github && (
                  <a href={profile.social.github}>
                    {" "}
                    <i className="fab fa-github"></i>
                  </a>
                )}
                {profile.social.linkedin && (
                  <a href={profile.social.linkedin}>
                    {" "}
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
              </li>
            </Fragment>
          )}
        </ul>
      </aside>
      <div className="profile-content col-7">
        <ul className="profile-content-menu">
          {menuShow.map(({ menu, isOpen }) => (
            <li>
              {" "}
              <a
                name={menu}
                onClick={toggleActiveMenu}
                id={isOpen ? "active" : ""}
              >
                {`${menu[0].toUpperCase()}${menu.slice(1)}`}
              </a>
            </li>
          ))}
        </ul>

        <ProfileExperience
          style={showContent("experience", menuShow, "block")}
          experience={sortInfo(profile.experiences)}
        />
        <ProfileEducation
          education={sortInfo(profile.education)}
          style={showContent("education", menuShow, "block")}
        />
        <ProfileProjects
          projects={profile.projects}
          style={showContent("projects", menuShow, "flex")}
        />
      </div>
    </section>
  );
};

export default Profile;
