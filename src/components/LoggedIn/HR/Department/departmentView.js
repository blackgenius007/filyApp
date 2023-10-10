import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Box, Container } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { FaUserTimes } from 'react-icons/fa';
import Button from '@mui/material/Button';
import CurrentStats from './currentStatus';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { EditorState } from 'draft-js';
import DepartmentTable from './departmentTable';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};


const GhostWorkerIcon = () => {
  return <FaUserTimes fontSize="30px" color="orange" />;
};

const ViewEmployee = () => {
    const {department} = useParams();
    console.log('department view=>',department)
  const { user } = useSelector((state) => state.auth);


  const linkStyle = {
    textDecoration: 'none',
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [messages, setMessages] = useState([]);



  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <h1>{user.data.businessName} {department} Department</h1>
      <br />
      <br />
      <Container>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <div style={{ textAlign: 'center' }}>
                  <CreateIcon fontSize="large" color="primary" />
                  <Link to="/create-new" style={linkStyle}>
                    <Typography variant="subtitle1">Create New</Typography>
                  </Link>
                </div>
              </Grid>
        
              <Grid item>
             
              </Grid>
                <Grid item>

                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>< DepartmentTable department={department} /></Typography>
          </Grid>
          {/* <Grid item xs={6}>   <Typography>table</Typography></Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default ViewEmployee;