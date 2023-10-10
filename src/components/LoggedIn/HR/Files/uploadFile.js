import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { Typography, Grid, Button,Dialog,DialogTitle,DialogContent } from '@mui/material';  
import axios from 'axios';
import { Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { IconButton } from '@mui/material';

const AddDocs= ({ logoutUser, auth }) => {
    const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [resume, setResume] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  const [pictures, setPictures] = useState([
    {
      data: [],
      url: '',
    },
  ]);

  const handleImageUpload = (e) => {
    [...e.target.files].forEach((file) => {
      console.log('file >>> ', file);

      setPictures([
        ...pictures,
        {
          data: file,
          url: URL.createObjectURL(file),
        },
      ]);

      console.log('pictures >> ', pictures);
    });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
 

  const onSubmit = (event) => {
    event.preventDefault();

    const image = pictures.map(({ data }) => {
      return data;
    });
    // const uploadedImages = pictures.forEach(uploaded => console.log(uploaded.data));
    console.log('images=>', image);

    const formData = new FormData();

    image.forEach((file) => {
      formData.append('image', file);
    });

    console.log(formData);
    axios.post(`/api/photo/images/${user.email}`, formData).then(
      (res) => {
        alert('Submitted successfully!');
        setIsActive(true);
      },

      (err) => {
        // alert('An error occured! Try submitting the form again.', err);
        if (err.response.status === 500) alert(err.response.data);
      }
    );
  };
    
      return (
        <>
         
         <div style={{ marginLeft: '100px' }}>
        <Typography variant="h4">Upload Confidential images </Typography>
        <span><small>Uploads should include only scanned images   </small></span>
  
        <Grid xs={12} container style={{ marginRight: '20px' }}>
          <Grid md={3}>
            <IconButton onClick={handleClick}>
              <Popup
                trigger={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-upload"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#9e9e9e"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                    <polyline points="7 9 12 4 17 9" />
                    <line x1="12" y1="4" x2="12" y2="16" />
                  </svg>
                }
                position="bottom center"
              >
                Upload portfolios images
              </Popup>
            </IconButton>
          </Grid>
          <Grid md={4}>
            <div style={{ color: 'gray' }}>
              <p>{resume.name ? resume.name : 'images only'}</p>
            </div>
          </Grid>

          <label>
            <div className="post__pictures">
              <input
                type="file"
                multiple
                name="images"
                onChange={handleImageUpload}
                accept="image/*"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
              />

              {pictures?.map((pic) => (
                <img
                  src={pic.url.length > 0 && pic.url}
                  style={{ fontSize: 0 }}
                  width="30px"
                  height="30px"
                  alt=""
                />
              ))}
              <p>{resume.name ? resume.name : ''}</p>
            </div>
          </label>
        </Grid>
        <br />
        <br />
      </div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        color="secondary"
        disabled={isLoading}
        onClick={onSubmit}
      >
        Submit
       
      </Button>
        </>
      );
};

const UploadDialog = ({ open,close }) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Upload Documents</DialogTitle>
      <DialogContent>
        <AddDocs />
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
