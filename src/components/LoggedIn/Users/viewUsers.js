import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ButtonBase } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Popup } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const FilterableTable = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(
    (state) => state.auth
  );
  console.log(user)
  // const user = useSelector((state) => state.auth.user);
  // const users = useSelector((state) => state.auth.users);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedInmate, setSelectedInmate] = useState(null);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [resume, setResume] = useState({});
  const [url, setUrl] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  const [preview, setPreview] = useState(false);
  const [avatar, setAvatar] = useState(false);

  // Photo onChanged function
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const url = URL.createObjectURL(fileUploaded);
    setUrl(url);
    setResume(fileUploaded);
    console.log(fileUploaded.name);
    console.log(fileUploaded);
    console.log(resume);
    setPreview(true);
  };
  // function to upload inmate picture
  // const onSubmitPhoto = async () => {
  //   try {
  //     if (resume) {
  //       const formData = new FormData();
  //       formData.append('image', resume, resume.name);

  //       const response = await axios.post(`/api/v1/images/${selectedInmate._id}`, formData);
  //       console.log('Server response:');
  //       // console.log(response.data);

  //       // Handle success scenario
  //       alert('Uploaded successfully');
  //     } else {
  //       alert('Please select an image');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
 
 // Toggle function
  const toggleUpload = () => {
    setUploadVisible((prevState) => !prevState);
  };
  
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
  };

  const cancelSearch = () => {
    setSearched('');

  };

  // Dispatch the action to fetch user by ID
  useEffect(() => {


    const fetchProject = async () => {
   
      const res = await axios.get(`/api/v1/auth/users/${user.data._id}`, {});

      if (res.data.length > 0) {
        console.log(res.data)
         setData(res.data);
         console.log(res.data);
      } 
      
    };
    
    fetchProject();
 
}, [user]);


  const filteredRows = data && data.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searched.toLowerCase())
    );
  });

  // function handles update
  const handleUpdate = (inmateId) => {
    navigate(`/inmates-update/${inmateId}`);
  };

 // function handles delete
// const handleDelete=(id)=>{
//   dispatch(deleteInmateById(id));

//   // function opens Dialog
// }
  const handleOpenDialog = (inmate) => {
    // Open the dialog and pass the inmate data
    setOpenDialog(true);
    setSelectedInmate(inmate);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };
  const closeEditClick = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDialog = () => {
    // Close the dialog
    setOpenDialog(false);
    setSelectedInmate(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <>
   
      <TextField
        value={searched}
        onChange={(e) => requestSearch(e.target.value)}
        label="Search"
        variant="outlined"
        size="small"
        style={{marginRight:'30px'}}
      /> <IconButton onClick={cancelSearch}>
      <CancelIcon />
    </IconButton>
      <br/>
      <br/>
      <Box height={400} overflow="auto" sx={{ width: '100%' }} style={{marginRight:'90px'}}>
        
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">user</TableCell>  */}
                <TableCell align="right">Name</TableCell> 
                <TableCell align="right">userName</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                {/* <TableCell align="right">Created@</TableCell> */}
                 <TableCell align="right">Action</TableCell>

                {/* Add more table headers for additional inmate properties */}
              </TableRow>
            </TableHead>
             <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right"><Avatar alt="Remy Sharp" src={row.imagePath} /></TableCell> 
                  <TableCell align="right">
                    <ButtonBase onClick={() => handleOpenDialog(row)}>
                      {row.userName}
                    </ButtonBase>
                  </TableCell>
                  <TableCell style={{color:'black'}} align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                 <TableCell align="right"><Edit onClick={() => handleUpdate(row._id)} /> {/* Edit icon with onClick handler */}
              <Delete  /> {/* Delete icon with onClick handler */}
            </TableCell>

                </TableRow>
              ))}
               </TableBody>
          </Table>

        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>


{
  selectedInmate && <div>
   <BootstrapDialog
  onClose={handleCloseDialog}
  aria-labelledby="customized-dialog-title"
  open={openDialog}
>
  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
    {selectedInmate.inmate_name}
  </BootstrapDialogTitle>
  <DialogContent dividers>
    <Box display="flex" alignItems="center" marginBottom={2}>
      <Avatar
        alt={selectedInmate.inmate_name}
        src={selectedInmate.imagePath}
        sx={{ width: 100, height: 100, marginRight: 2 }}
      />
      <Box>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          Age: {selectedInmate.date_of_birth}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          Ethnicity: {selectedInmate.ethnicity}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          Height: {selectedInmate.height}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          Weight: {selectedInmate.weight}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          Gender: {selectedInmate.gender}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          SSN: {selectedInmate.social_security}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
          Inmate Nos: {selectedInmate.inmate_number}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body2" gutterBottom style={{ color: 'grey' }}>
      {selectedInmate.description}
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={toggleUpload}>Upload Inmate Photo</Button>
  </DialogActions>

</BootstrapDialog>


</div>

}

    </>
  );
};

export default function MainPage() {
  return (
    <div>
      <FilterableTable />
      
    </div>
  );
}



// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { retrieveUserById } from '../../Services/AuthServices/authSlice';

// // Component code
// const ViewUsers = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);
//   const users = useSelector((state) => state.auth.users);

//   // Dispatch the action to fetch user by ID
//   useEffect(() => {
//     const userId = user?.data?._id;
//     if (userId) {
//       dispatch(retrieveUserById(userId));
//     }
//   }, [dispatch, user]);
// console.log(users)
// console.log(user)
//   // Render th)e fetched user(s)
//   return (
//     <div>
//       {user && <div>User: {user.data.businessName}</div>}
//       {users && users.length > 0 && (
//         <div>
//           Users with the same ID:
//           {users && users.map((user) => (
//             <div key={user._id}>{user.email}</div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUsers;



