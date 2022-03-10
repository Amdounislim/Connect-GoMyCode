import axios from "axios";
import { setAlert } from "./alertActions";
import {
  GET_USERS_FAil,
  GET_USERS,
  DELETE_USER,
  DELETE_USER_FAil,
  TOGGLE_ACCESS_USER,
  TOGGLE_ACCESS_USER_FAIL,
  ADD_SCORE_USER,
  ADD_SCORE_USER_FAIL
} from "../const/actionTypes";

//Get all users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAil
    });
    dispatch(setAlert(error.message, "warning"));
  }
};

// Delete user by id
export const deleteUserById = id => async dispatch => {
  try {
    await axios.delete(`/api/admin/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
    dispatch(setAlert("User deleted !", "success"));
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAil
    });

    dispatch(setAlert(error.message, "warning"));
  }
};

//Add or Remove Access

export const toggleAccess = id => async dispatch => {
  try {
    const res = await axios.put(`/api/admin/${id}`);
    dispatch({
      type: TOGGLE_ACCESS_USER,
      payload: id
    });

    res.data.isGranted
      ? dispatch(
          setAlert(
            `${res.data.name} ${res.data.lastName} Has Access`,
            "success"
          )
        )
      : dispatch(
          setAlert(
            `${res.data.name} ${res.data.lastName} Access Removed`,
            "success"
          )
        );
  } catch (error) {
    dispatch({
      type: TOGGLE_ACCESS_USER_FAIL
    });

    dispatch(setAlert(error.message, "warning"));
  }
};
//Add or Remove Access

export const addScore = (id, gmc_id, formData) => async dispatch => {
  try {
    await axios.put(`/api/admin/add_score/${id}/${gmc_id}`, formData);
    dispatch({
      type: ADD_SCORE_USER
    });

    dispatch(setAlert("Score Added with Success", "success"));
  } catch (error) {
    dispatch({
      type: ADD_SCORE_USER_FAIL
    });
    const errors = error.response.data.errors;
    errors &&
      Array.isArray(errors) &&
      errors.forEach(err => {
        dispatch(setAlert(err, "warning"));
      });
  }
};
