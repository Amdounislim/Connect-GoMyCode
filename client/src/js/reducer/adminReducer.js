import {
  GET_USERS_FAil,
  GET_USERS,
  DELETE_USER,
  TOGGLE_ACCESS_USER
} from "../const/actionTypes";

const initState = {
  users: [],
  loading: true
};

export default function(state = initState, { type, payload }) {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };

    case TOGGLE_ACCESS_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === payload ? { ...user, isGranted: !user.isGranted } : user
        )
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload)
      };

    case GET_USERS_FAil:
      return { ...state, loading: false };
    default:
      return state;
  }
}
