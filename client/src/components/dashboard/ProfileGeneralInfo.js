import React from "react";
import Avatar from "./Avatar";
import CreateEditModalProfile from "../dashboard-modals/CreateEditProfileModal";

const ProfileGeneralInfo = ({
  profile,
  createProfile,
  uploadAvatar,
  user,
  avatar,
  loading
}) => {
  return (
    <div className="container-icone-user col-5">
      <CreateEditModalProfile
        profile={profile}
        createProfile={createProfile}
        uploadAvatar={uploadAvatar}
        user={user}
      />

      <Avatar
        id={user._id}
        avatar={avatar}
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap"
        }}
      >
        <h4>
          <i class="fas fa-user"></i> Welcome{" "}
          {user && `${user.name} ${user.lastName}`}
        </h4>

        {profile === null && (
          <h3>You have not yet setup a profile, please add some info </h3>
        )}

        {profile !== null && (
          <div>
            <p>
              <i class="far fa-bookmark" /> Status : {profile.status}
            </p>
            {profile.location && (
              <p>
                <i class="fa fa-map-marker-alt" /> Location : {profile.location}
              </p>
            )}
            {profile.bio && <p>Bio : {profile.bio}</p>}
            {profile.social && (
              <div>
                {profile.social.linkedin && (
                  <p>
                    <i className="fab fa-linkedin" />{" "}
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.social.linkedin}
                    </a>
                  </p>
                )}
                {profile.social.github && (
                  <p>
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github" /> {profile.social.github}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileGeneralInfo;
