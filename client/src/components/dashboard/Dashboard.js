import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteInfo,
  createProfile,
  uploadAvatar,
  addSkill,
  addGomycode,
  addEducation,
  addExperience,
  addProject
} from "../../js/actions/profileActions";

import Spinner from "../layouts/Spinner/Spinner";

import ProfileSkills from "./ProfileSkills";
import ProfileGomycode from "./ProfileGomycode";
import ProfileGeneralInfo from "./ProfileGeneralInfo";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileProject from "./ProfileProject";
import "./Dashboard.css";

const Dashboard = ({
  getCurrentProfile,
  createProfile,
  uploadAvatar,
  addSkill,
  addGomycode,
  addEducation,
  addExperience,
  addProject,
  deleteInfo,
  auth: { user, loading: authLoading },
  profile: { profile, loading, avatar }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div className="dashboard-container">
      {authLoading || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="dashboard-container-row">
            {" "}
            <h1>Dashboard</h1>
          </div>

          <div className="dashboard-container-row">
            <ProfileGeneralInfo
              profile={profile}
              createProfile={createProfile}
              uploadAvatar={uploadAvatar}
              user={user}
              avatar={avatar}
            />
            <ProfileSkills
              profile={profile}
              addSkill={addSkill}
              deleteInfo={deleteInfo}
            />
            <ProfileGomycode
              deleteInfo={deleteInfo}
              profile={profile}
              addGomycode={addGomycode}
            />
            <ProfileEducation
              deleteInfo={deleteInfo}
              profile={profile}
              addEducation={addEducation}
            />
            <ProfileExperience
              deleteInfo={deleteInfo}
              profile={profile}
              addExperience={addExperience}
            />
            <ProfileProject
              deleteInfo={deleteInfo}
              profile={profile}
              addProject={addProject}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  addGomycode: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  deleteInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteInfo,
  createProfile,
  uploadAvatar,
  addSkill,
  addGomycode,
  addEducation,
  addProject,
  addExperience
})(Dashboard);
