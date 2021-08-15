import {
  SET_USERS, SET_SUBJECT, EDIT_NOTE, SET_TRUE, SET_FALSE, SET_NOTE, RESET_USER, ADD_SUBJECT
} from "../../constants/users/usersConstants";

const initial_state = {
  subject: "",
  note: "",
  users: [],
  open: false
}

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_SUBJECT:
      return { ...state, subject: action.payload };
    case ADD_SUBJECT:
      return { ...state, subject: action.payload };
    case RESET_USER:
      return { ...state, subject: "", note: "" };
    case SET_NOTE:
      return { ...state, note: action.payload };
    case EDIT_NOTE:
      return { ...state, note: action.payload };
    case SET_TRUE:
      return { ...state, open: true, subject: action.payload };
    case SET_FALSE:
      return { ...state, open: false };
    default:
      return state;
  }

}
