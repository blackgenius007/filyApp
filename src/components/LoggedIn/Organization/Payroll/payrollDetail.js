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

export default function PaymentDetail({
  open,
  projectname,
  PayrollDetail,
  close,
}) {
//   const { payroll } =  PayrollDetail;
  console.log(PayrollDetail.designation)
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        PaperComponent={PaperComponent}
        // style={{color:'#ffcc00'}}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: 'move', backgroundColor: '#20B2AA', color: '#fff' }}
          id="draggable-dialog-title"
        >
          <div style={{ color: '#fff' }}>Payment Details</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <IconButton onClick={close}>
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
