import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from '@material-ui/core/CardContent';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Dialog, DialogTitle, DialogContent, Grid, TextField, Button, Typography, Box } from "@material-ui/core";


class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    console.log(this.props)
    let {
      users,
      deleteUser,
      updateUser,
      editNote,
      handleClickOpen,
      handleClose,
      setSubject, setNote, addUser ,addSubject
    } = this.props;
    console.log(users);
    return (
      <div style={{backgroundColor:"#00003f" }}>
        <Grid container>
          <Grid item xs={6} lg={4}>
            <Card style={{margin: "10px 5px 0px 10px"}}>
              <CardContent>
                <Typography variant="h6">ADD NOTE</Typography>
                <TextField
                  variant="outlined"
                  label="Subject"
                  onChange={(e) => { addSubject(e.target.value) }}
                  margin="dense"
                  fullWidth
                  value={users.subject}
                />
                <TextField
                  variant="outlined"
                  label="Note"
                  onChange={(e) => { setNote(e.target.value) }}
                  margin="dense"
                  fullWidth
                  multiline
                  value={users.note}
                />
                <Button
                  onClick={() => { addUser(users.subject, users.note) }}
                  id="note-input"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  margin="normal"
                >ADD NOTE +
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
        <Grid container spacing={2}>
          {users.users.map((s, i) => (
            <Grid item md={8} xs={12} lg={3}>
              <Card style={{margin: "40px 5px 0px 10px"}}>
                <CardHeader
                  title="Note taking App"
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box>
                        <Typography variant="h6">{s.subject}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <Typography>{s.note}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions disableSpacing>
                  <IconButton aria-label="edit" >
                    <EditIcon onClick={() => { handleClickOpen(s.subject); editNote(s.note); }} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => { deleteUser(s.subject) }} />
                  </IconButton>
                </CardActions>
              </Card>

              <Dialog open={users.open}
                onClose={() => handleClose(false)}
              >
                <DialogTitle>Update</DialogTitle>
                <DialogContent>
                  <Box>{users.subject}</Box>
                  <TextField
                    label='Note'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    multiline
                    value={users.note}
                    onChange={(e) => { editNote(e.target.value) }}
                  />
                  <Button variant="contained" color="secondary" fullWidth
                    onClick={() => { updateUser(users.subject, users.note) }}
                  >EDIT</Button>
                  <Button onClick={() => handleClose(false)} color="secondary">
                    CANCEL
                  </Button>
                </DialogContent>
              </Dialog>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Users;