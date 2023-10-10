import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { useParams, Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import EmployeeTax from '../../Tax/employeePayroll';


function PaperComponent(props) {


  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}



export default function PaymentDetail({ 
  open,
  country,
  name,
  id,
  close,
}) {

  const { user } = useSelector((state) => state.auth);

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
          style={{ cursor: 'move', backgroundColor: 'purple', color: '#fff' }}
          id="draggable-dialog-title"
        >
          <div style={{ color: '#fff' }}>{name}'s Income Breakdown</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
        
          </DialogContentText>
          <EmployeeTax  
          location ={country}
         
          />
          
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

          
        </DialogActions>
      </Dialog>
    </div>
  );
}
