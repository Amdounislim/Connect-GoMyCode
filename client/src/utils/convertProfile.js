import sortInfo from "./sortInfo";

function convertProfile(profile) {
  return {
    ...profile.user,
    status: profile.status,
    location: profile.location,
    studies:
      profile.education && profile.education[0]
        ? sortInfo(profile.education)[0]
        : {},
    skills:
      profile.skills && profile.skills[0]
        ? profile.skills.map(skill => skill.skill)
        : [],
    experience:
      profile.experiences && profile.experiences[0]
        ? sortInfo(profile.experiences)[0]
        : {}
  };
}

export default convertProfile;
