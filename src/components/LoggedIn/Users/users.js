import React from 'react';
import { Grid } from '@mui/material';
import CreateUsers from './createUsers';
import ViewUsers from './viewUsers';

const Users = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CreateUsers />
      </Grid>
      <Grid item xs={6} >
        <div style={{marginRight:'20px'}}>
        <ViewUsers />
        </div>
 
      </Grid>
    </Grid>
  );
};

export default Users;
