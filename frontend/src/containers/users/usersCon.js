import { connect } from "react-redux";
import Users from "../../components/users/users";

import {
    getUsers,
    deleteUser,
    updateUser,
    setSubject,
    editNote,
    handleClose, 
    handleClickOpen,
    setNote
    ,addUser
    ,resetAddUser,
    addSubject
  } from "../../actions/users/usersAction";

  export const mapStateToProps = store => {
        return {
            users : store.users
        }
  }

  export const mapDispatchToProps = dispatch => {
    return {
        getUsers : () => {
            dispatch(getUsers());
        },
        setSubject : (subject) => {
          dispatch(setSubject(subject));
        },
        addSubject : (subject) => {
          dispatch(addSubject(subject));
        },
        setNote : (note) => {
          dispatch(setNote(note));
        },
        editNote : (note) => {
          dispatch(editNote(note));
        },
        deleteUser : (subject) => {
          dispatch(deleteUser(subject));
        },
        handleClickOpen : (subject) => {
          dispatch(handleClickOpen(subject));
        },
        handleClose : () => {
          dispatch(handleClose());
        },
        updateUser : (subject , note) => {
          dispatch(updateUser(subject , note));
        },
        addUser : (subject , note) => {
          dispatch(addUser(subject , note));
        },
        resetAddUser : () => {
          dispatch(resetAddUser());
        }
      }

  }


export default connect (mapStateToProps, mapDispatchToProps) (Users);