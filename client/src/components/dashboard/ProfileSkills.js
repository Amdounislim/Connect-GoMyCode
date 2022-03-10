import React, { Fragment } from "react";
import AddSkillModal from "../dashboard-modals/AddSkillModal";

const ProfileSkills = ({ profile, addSkill, deleteInfo }) => {
  return (
    <Fragment>
      {profile && profile.skills && profile.skills[0] ? (
        <div
          className="container-icone-user col-5"
          style={{ flexDirection: "column" }}
        >
          <AddSkillModal addSkill={addSkill} />
          <h4>
            <i className="fas fa-code" /> Profile Skills
          </h4>
          {profile.skills.map(skill => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                borderBottom: "1px solid  #e8e8e8"
              }}
            >
              <h5>
                {skill.skill}-{skill.level}%
              </h5>
              <i
                className="fas fa-trash remove-btn"
                onClick={() => deleteInfo(skill._id, "skills", "Skill Deleted")}
              />
            </div>
          ))}
        </div>
      ) : (
        profile !== null && (
          <div
            className="container-icone-user col-5"
            style={{ flexDirection: "column" }}
          >
            <h4>
              <i className="fas fa-code" /> Profile Skills
            </h4>{" "}
            ADD SKILLS <AddSkillModal addSkill={addSkill} />{" "}
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProfileSkills;
