import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
 

const RightSidebar = ({ isOpen, onClose   }) => {
 
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: 250, padding: '1rem' }}>
      <Typography variant="h6">How it works</Typography>
              
      </div>
    </Drawer>
  );
};

export default RightSidebar;


 