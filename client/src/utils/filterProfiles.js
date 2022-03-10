const convertToFilter = ({ experience, skills, studies, status }) => {
  return [experience.title, ...skills, studies.fieldofstudy, status];
};
const makeRgx = (query) => {
  return new RegExp(query.join("|"), "i", "g");
};

const filterProfile = (profiles, queries) => {
  return profiles.filter((profile) => {
    const result = queries.map((query) => {
      // const rgx = new RegExp(query.join("|"),"i","g")
      // console.log(profile.skills , query)
      return makeRgx(query).test(convertToFilter(profile));
    });
    // console.log(result)

    return result.indexOf(false) === -1 && profile.isGranted;
  });
};

export default filterProfile;
