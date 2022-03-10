import React from "react";
const style = {
  margin: "1rem 0"
};

const SearchUser = ({ handleChange }) => {
  return (
    <div style={style}>
      <form className="search-user-admin">
        <input
          type="text"
          placeholder="Search.."
          name="inputValue"
          onChange={handleChange}
        />
        <button>
          <i className="fa fa-search"></i>
        </button>

        <select name="verified" onChange={handleChange}>
          <option value="0">User's Access</option>
          <option value="1">Verified</option>
          <option value="2">Not Verified</option>
        </select>
      </form>
    </div>
  );
};

export default SearchUser;
