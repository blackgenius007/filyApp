import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Box, Container } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import GroupIcon from '@mui/icons-material/Group';
import { Button } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import HrRecords from './hr-records';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const HumanResource = () => {

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
    <Container>
      <h2>Human Resources Records</h2>
      <br/>
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <div style={{ textAlign: 'center' }}>
                <BuildIcon fontSize="large" color="primary" />
                <Link to="/setup"  style={linkStyle}>
      <Typography variant="subtitle1">Setup</Typography>
    </Link>
              </div>
            </Grid>
            <Grid item>
              <div style={{ textAlign: 'center' }}>
                <GroupIcon fontSize="large" color="primary" />
                <Link to="/employee"  style={linkStyle}>
                <Typography variant="subtitle1">Employee</Typography>
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div style={{ textAlign: 'center' }}>
                <PhotoLibraryIcon fontSize="large" color="primary" />
                <Link to="/create-department"  style={linkStyle}>
                <Typography variant="subtitle1">Gallery</Typography>
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div style={{ textAlign: 'center' }}>
                <PersonAddIcon fontSize="large" color="primary" />
                <Link to="/create-department"  style={linkStyle}>
                <Typography variant="subtitle1"> Hire</Typography>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid item xs={6}>
          <Box textAlign="center" border={1} borderRadius={2} p={2} boxShadow={3} style={{ padding: '10px' }}>
            {/* Todo List Icon */}
            <Typography variant="h6"> <div>
      <h2>Internal memo</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
       {/* Text Editor */}
       <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              placeholder="Add full detail of job"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              // onClick={(e)=>handleSubmit(e)}
            >
              Submit
            </Button>
    </div></Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center" border={1} borderRadius={2} p={2} boxShadow={3}>
         <HrRecords/>
          </Box> 
        </Grid>
      </Grid>
    </Container>
  );
};

export default HumanResource ;


