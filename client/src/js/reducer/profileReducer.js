import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  UPLOAD_AVATAR,
  LOGOUT,
  GET_ALL_PROFILES,
  SET_LOADING
} from "../const/actionTypes";

const initialState = {
  profile: null,
  avatar: null,
  profiles: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: [...payload],
        loading: false
      };

    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case UPLOAD_AVATAR:
      return { ...state, avatar: payload };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        avatar: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true
      };
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case LOGOUT:
      return {
        profile: null,
        avatar: null,
        profiles: [],
        loading: true
      };
    default:
      return state;
  }
}
