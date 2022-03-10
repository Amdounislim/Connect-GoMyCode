import { SET_ALERT, REMOVE_ALERT, CLOSE_ALERT } from "../const/actionTypes";

const initialState = [];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
    case CLOSE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
