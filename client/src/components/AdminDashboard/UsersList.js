import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import filterUser from "../../utils/filterUsers.js";
import {
  getUsers,
  deleteUserById,
  toggleAccess,
  addScore
} from "../../js/actions/adminActions";
import UserRaw from "./UserRaw";
import SearchUser from "./SearchUser";
import Spinner from "../layouts/Spinner/Spinner.js";

/**
 *@filterUser is a util function check utils
 */

const UsersList = () => {
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin);
  const { loading, users } = admin;
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const [search, setSearch] = useState({ inputValue: "", verified: null });

  const handleChange = e => {
    setSearch({
      ...search,
      [e.target.name]:
        e.target.name === "inputValue"
          ? e.target.value
          : e.target.value === "0"
          ? null
          : e.target.value === "1"
          ? true
          : false
    });
  };

  const deleteUser = id => {
    window.confirm("Are you sure you want to delete this user ??") &&
      dispatch(deleteUserById(id));
  };

  const verifyAccess = id => dispatch(toggleAccess(id));
  const setScore = (id, formData) => dispatch(addScore(id, formData));

  return (
    <div id="admin-content">
      <h2>Admin Dashboard</h2>
      <SearchUser handleChange={handleChange} />

      {loading ? (
        <Spinner />
      ) : (
        <table id="users">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Access</th>
              <th>Score</th>
              <th>Remove User</th>
            </tr>
          </thead>

          {filterUser(users, search).map(user => (
            <UserRaw
              key={user._id}
              user={user}
              deleteUser={deleteUser}
              verifyAccess={verifyAccess}
              addScore={setScore}
            />
          ))}
        </table>
      )}
    </div>
  );
};

export default UsersList;
