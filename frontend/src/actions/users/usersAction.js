import {
  SET_USERS, SET_NOTE, SET_SUBJECT, EDIT_NOTE, SET_TRUE, SET_FALSE,RESET_USER, ADD_SUBJECT
} from "../../constants/users/usersConstants";

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users
  }
}

export function getUsers() {
  return (dispatch) => {
    return fetch("http://localhost:8000/get_notes", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        limit: 100,
        skip: 0
      })
    })
      .then(res => res.json())
      .then((resJson) => {
        dispatch(setUsers(resJson.result))
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


export function deleteUser(subject) {
  return (dispatch) => {
    return fetch("http://localhost:8000/delete_note", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: subject
      })
    })
      .then(res => res.json())
      .then((resJson) => {
        console.log(resJson);
        dispatch(getUsers());
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


export function setSubject(subject) {
  return {
    type: SET_SUBJECT,
    payload: subject
  }
}

export function setNote(note) {
  return {
    type: SET_NOTE,
    payload: note
  }
}
export function addSubject(subject) {
  return {
    type: ADD_SUBJECT,
    payload: subject
  }
}

export function editNote(note) {
  return {
    type: EDIT_NOTE,
    payload: note
  }
}

export function handleClickOpen(subject) {
  return {
    type: SET_TRUE,
    payload: subject
  }
}

export function handleClose() {
  return {
    type: SET_FALSE
  }
}


export function updateUser(subject, note) {
  return (dispatch) => {
    return fetch("http://localhost:8000/update_note", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: subject,
        note: note,
      })
    })
      .then(res => res.json())
      .then((resJson) => {
        console.log(resJson);
        dispatch(handleClose())
        dispatch(getUsers())
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function resetAddUser(){
  return{
    type: RESET_USER
  }
}

export function addUser(subject, note) {
  return (dispatch) => {
    return fetch("http://localhost:8000/add_note", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: subject,
        note: note,
      })
    })
      .then(res => res.json())
      .then((resJson) => {
        console.log(resJson);
        dispatch(handleClose())
        dispatch(getUsers())
        dispatch(resetAddUser())
      })
      .catch((error) => {
        console.error(error);
      });
  }
}






