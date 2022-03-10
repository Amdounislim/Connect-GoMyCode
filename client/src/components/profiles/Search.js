import React from "react";

const Search = ({
  handleChange,
  skillsTag,
  statusTag,
  studieTag,
  setSkills,
  setStudie,
  setStatus,
  searchInput,
  setSearchInput
}) => {
  const checkedOnly = array => {
    return array.filter(el => el.checked);
  };

  return (
    <div className="search-profile-container col-12">
      <form className="search-profile col-12">
        <input
          type="text"
          placeholder="Search.."
          name="inputValue"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button onClick={e => e.preventDefault()}>
          <i className="fa fa-search"></i>
        </button>
      </form>
      <div className="tags-container col-12">
        {checkedOnly(skillsTag).length === 0 &&
          checkedOnly(statusTag).length === 0 &&
          checkedOnly(studieTag).length === 0 && (
            <p>No active filters, displaying all results</p>
          )}
        {skillsTag
          .filter(el => el.checked === true)
          .map(el => (
            <span
              className="tag-filter"
              onClick={e => handleChange(skillsTag, setSkills, el)}
            >
              {" "}
              {el.value} <i className="fas fa-times" />{" "}
            </span>
          ))}
        {studieTag
          .filter(el => el.checked === true)
          .map(el => (
            <span
              className="tag-filter"
              onClick={e => handleChange(studieTag, setStudie, el)}
            >
              {" "}
              {el.value} <i className="fas fa-times" />{" "}
            </span>
          ))}
        {statusTag
          .filter(el => el.checked === true)
          .map(el => (
            <span
              className="tag-filter"
              onClick={e => handleChange(statusTag, setStatus, el)}
            >
              {" "}
              {el.value} <i className="fas fa-times" />{" "}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Search;
