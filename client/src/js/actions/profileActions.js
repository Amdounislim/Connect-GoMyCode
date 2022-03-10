import axios from "axios";
import converProfile from "../../utils/convertProfile";
import { setAlert } from "./alertActions";
import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  GET_ALL_PROFILES_FAIL,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPLOAD_AVATAR,
  SET_LOADING
} from "../const/actionTypes";

//get All profiles

export const getAllProfiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles/");

    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data.map(el => converProfile(el))
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_PROFILES_FAIL
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
  }
};

// Get Auth users profile
export const getCurrentProfile = () => async dispatch => {
  dispatch({
    type: SET_LOADING
  });
  try {
    const res = await axios.get("/api/profiles/current");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
  }
};
// Get Auth users profile
export const getProfileById = id => async dispatch => {
  dispatch({
    type: SET_LOADING
  });
  try {
    const res = await axios.get(`/api/profiles/profile/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
  }
};

//uploAd Avatar
export const uploadAvatar = (avatar, localAvatar) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    await axios.post("/api/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    dispatch({
      type: UPLOAD_AVATAR,
      payload: localAvatar
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    } else {
      dispatch(setAlert("Image upload Error !", "warning"));
    }
  }
};

// Create or update profile

export const createProfile = (formData, edit = false) => async dispatch => {
  try {
    const res = await axios.post("/api/profiles", formData);
    dispatch({
      type: edit ? UPDATE_PROFILE : GET_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert(
        edit ? "Profile informations Updated" : "Profile Created",
        "success"
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience

export const addExperience = formData => async dispatch => {
  try {
    const res = await axios.put("/api/profiles/experiences", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education

export const addEducation = formData => async dispatch => {
  try {
    const res = await axios.put("/api/profiles/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add project

export const addProject = formData => async dispatch => {
  try {
    const res = await axios.put("/api/profiles/projects", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Project Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add gomycode

export const addGomycode = formData => async dispatch => {
  try {
    const res = await axios.put("/api/profiles/gomycode", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Certification Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add skill

export const addSkill = formData => async dispatch => {
  try {
    const res = await axios.put("/api/profiles/skills", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Skill Added", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//delete Info
export const deleteInfo = (id, path, successMsg) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profiles/${path}/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(successMsg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "warning")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Replace all the update dfunctions
// export const addProfileInfo = (
//   formData,
//   history,
//   path,
//   successMsg
// ) => async dispatch => {
//   try {
//     const res = await axios.put("/api/profiles/" + path, formData);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert(successMsg, "success"));
//     history.push("/dashboard");
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error, "warning")));
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
