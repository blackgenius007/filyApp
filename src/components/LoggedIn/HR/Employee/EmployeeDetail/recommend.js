import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { useParams, Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BsFolderSymlink } from 'react-icons/bs';

function PaperComponent(props) {
  const classes = useStyles();

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Recommend({
  open,
  projectname,
  close,
  score,
  verify,
  id,
  name,
}) {
  // alert(id)
  const { user } = useSelector((state) => state.auth);

const[disabled,setDisabled]=useState(false)

  const handleRecommend = () => {
   

    if (verify=== false) {
      Swal.fire({
        title: '',
        text: ' you can only give recommendation after your company is verified!',

        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    } else {
      console.log(` user's  score=> `, user.score);
      console.log('=================', score);

      var nums = parseInt(user.score) * 0.1 + parseInt(score);
      alert(user.score);
      alert(score);
      alert(nums);

      axios

        .get(
          `/api/v1/employee/add-score/${user.email}/${id}/${projectname}/${nums}`
        )
        .then((res) => {
          alert('recommendation succesful');
          console.log(res);
        })
        .catch((err) => {
          alert('An error occured! Try submitting the form again.', err);
          console.log(err);
        });
    }
    setDisabled(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        PaperComponent={PaperComponent}
         style={{color:'#ffcc00'}}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: 'move', backgroundColor: '#20B2AA', color: '#fff' }}
          id="draggable-dialog-title"
        >
          <div style={{ color: '#fff' }}>{`Recommend ${name}`} </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are only allowed to Recommend an employee after your company
            have been verified
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={close} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="#6f32be"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </IconButton>

          {/* <Button autoFocus onClick={close} color="primary">
            Cancel
          </Button> */}

          <Popup
            trigger={
              <IconButton
                aria-label="Add to favorites"
                onClick={handleRecommend}
                disabled={disabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-thumb-up"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="#6f32be"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                </svg>
              </IconButton>
            }
            position="top center"
          >
            Good Recommendation
          </Popup>
          <Popup
            trigger={
              <IconButton aria-label="Add to favorites">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-thumb-down"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="#6f32be"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                </svg>
              </IconButton>
            }
            position="top center"
          >
            Bad recommendation
          </Popup>

          {/* <Button color="primary">Good Recommen</Button>
          <Button color="primary">Bad Recommendation</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
