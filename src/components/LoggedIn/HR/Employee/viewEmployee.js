import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Container } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { FaUserTimes } from 'react-icons/fa';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { EditorState } from 'draft-js';
import EmployeeTable from './employeeTable';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const GhostWorkerIcon = () => {
  return <FaUserTimes fontSize="30px" color="orange" />;
};

const ViewEmployee = () => {
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
      <h1>{user.data.businessName} EMPLOYEE DATABASE</h1>
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
                <div style={{ textAlign: 'center' }}>
                  <PhotoLibraryIcon fontSize="large" color="primary" />
                  <Link to="/create-department" style={linkStyle}>
                    <Typography variant="subtitle1"> Gallery</Typography>
                  </Link>
                </div>
              </Grid>
              <Grid item>
                <div style={{ textAlign: 'center' }}>
                  <FaUserTimes fontSize="30px" color="orange" />
                  <Link to="/create-department" style={linkStyle}>
                    <Typography variant="subtitle1"> Redundant </Typography>
                  </Link>
                </div>
              </Grid>
                <Grid item></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography><EmployeeTable/></Typography>
          </Grid>
          {/* <Grid item xs={6}>   <Typography>table</Typography></Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default ViewEmployee;

// import React, { Fragment } from 'react';
// import Table from './employeeTable';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Typography, Chip,Button  } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import { PersonOutline } from '@mui/icons-material'

// function ViewEmployee() {
//   const { user } = useSelector(
//     (state) => state.auth
//   );

//   return (
//     <Fragment>
// <div>
//   <h1 style={{ fontSize: '35px',  textAlign: 'center',color:'grey' }}>
//    EMPLOYEE DATABASE
//   </h1>
// </div>
// <Link to="/create-new" style={{ textDecoration: 'none' }}>
//       <button>Create New </button>
//     </Link>
// {/* <br/> */}
//   {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
//       <label>
//         <Chip
//           size="small"
//           icon={<CloseIcon />}
//           label="Sentenced"
//           clickable

//           // onClick={(e) => this.handleRecommend(e)}
//           onClick={() => this.handleEditRec()}
//           // deleteIcon={<DoneIcon />}
//         />
//       </label>
//       <label>
//         <Chip
//           size="small"
//           icon={<PersonOutline />}
//           label="Inmates Gallery"
//           clickable

//           onClick={() => this.handleEditPersonal()}
//           // deleteIcon={<DoneIcon />}
//         />
//       </label>
//       <label>
//         <Chip
//           size="small"
//           icon={<AccessTimeIcon />}
//           label="Latest Inmates"
//           clickable

//           // onClick={(e) => this.handleRecommend(e)}
//           onClick={() => this.handleEditRec()}
//           // deleteIcon={<DoneIcon />}
//         />
//       </label>
//     </div> */}

// <Table />

//     </Fragment>

//   )
// }

// export default ViewEmployee
