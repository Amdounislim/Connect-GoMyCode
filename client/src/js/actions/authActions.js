import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "./alertActions";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGGIN_FAIL,
  LOGGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from "../const/actionTypes";

//Load User

export const loadUser = () => async dispatch => {
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/api/auth/");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//REGISTER USER
export const register = ({
  email,
  password,
  phone,
  name,
  lastName
}) => async dispatch => {
  try {
    const res = await axios.post("/api/auth/register", {
      email,
      password,
      phone,
      name,
      lastName
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert("Register Success", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch({
      type: REGISTER_FAIL
    });
    errors &&
      errors.forEach(err => {
        dispatch(setAlert(err, "warning"));
      });
  }
};

//LOGIN USER
export const login = ({ email, password }) => async dispatch => {
  try {
    const res = await axios.post("/api/auth/login", { email, password });
    dispatch({
      type: LOGGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert("Login Success", "success"));
  } catch (error) {
    dispatch({
      type: LOGGIN_FAIL
    });
    const errors = error.response.data.errors;
    Array.isArray(errors) &&
      errors.forEach(err => {
        dispatch(setAlert(err, "warning"));
      });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({
    type: LOGOUT
  });
  dispatch(setAlert("Logout success", "success"));
};

//Edit Account

export const editAccount = (FormData, history) => async dispatch => {
  try {
    await axios.put("/api/users/", FormData);
    dispatch({
      type: "EDIT_ACCOUNT"
    });
    dispatch(loadUser());
    history.push("/dashboard");
    dispatch(setAlert("Account Edited", "success"));
  } catch (error) {
    dispatch({
      type: "EDIT_ACCOUNT_FAIL"
    });
    const errors = error.response.data.errors;
    Array.isArray(errors) &&
      errors.forEach(err => {
        dispatch(setAlert(err, "warning"));
      });
  }
};
