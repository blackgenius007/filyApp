import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';

const Header = () => {
  // State for dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/path/to/logo.png" alt="Logo" />
          <Typography variant="h6" component="div" sx={{ color: 'black', fontSize: '30px', marginLeft: '150px' }}>
          <span style={{ fontWeight: 'bold', color: 'black' }}>54</span>
          <span style={{ fontWeight: 'bold', color: 'orange' }}>workstreet</span>
        </Typography>
        </Typography>

        {/* Dropdown Menu */}
        <div>
          <Button
            id="services-menu"
            aria-controls="services-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            Services
          </Button>
          <Menu
            id="services-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
             <MenuItem onClick={handleMenuClose}>Service 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 3</MenuItem>
            {/* Add more menu items as needed */}
          </Menu>
        </div>
        
        {/* Login Button */}
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
