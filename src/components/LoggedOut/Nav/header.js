import React,{useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { RiArrowDownSLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import workfilyLogo from '../../../assets/fillybee.png';
import Login from '../Register_login/Login';

const Header = () => {
  // State for dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const {user , isSuccess } = useSelector(
    (state) => state.auth
  );
 
  const [showBees, setShowBees] = useState(false);

  const handleHover = () => {
    setShowBees(true);
  };

  const handleLeave = () => {
    setShowBees(false);
  };
  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };



//  const  gotoDashboard = ()=>{

//  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <AppBar position="static" style={{ background: 'white', boxShadow: 'none' }}>
      <Toolbar>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={workfilyLogo} alt="Workfily Logo" style={{ width: '45px', marginRight: '6px' }} />
          {/* Name */}
          <Typography variant="h6" component="div" sx={{ color: 'black', fontSize: '36px' }}>
            <span style={{ fontWeight: '900', color: 'black' }}>workfily</span>
          </Typography>
        </div>

        {/* Dropdown Menu */}
        <div style={{ marginLeft: '20px' }}>
          <Button
            id="services-menu"
            aria-controls="services-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            style={{ color: 'black', '&:hover': { background: 'lightblue' } }}
            disableRipple
          >
            Services
            <RiArrowDownSLine
              style={{ marginLeft: '4px', fontSize: '20px', fontWeight: 'thin', verticalAlign: 'middle' }}
            />
          </Button>
          <Menu id="services-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Service 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 1</MenuItem>
            {/* Add more menu items as needed */}
          </Menu>
        </div>
        <div style={{color:'blue'}}>
        {/* {UserName || 'owner'} */}

        </div>

        {/* Login Button */}
        <div style={{ marginLeft: 'auto', marginRight: '150px' }}>

  {!isSuccess && !user ? (
 <Button color="inherit" style={{ color: 'black' }} onClick={handleLoginOpen}>
 Login
</Button>
          ) : (
            <Button color="inherit" style={{ color: 'black' }} component={NavLink} to="/dashboard" className="button-container"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}   >
               <span className={`dot ${showBees ? 'active' : ''}`} />
      <span className={`dot ${showBees ? 'active' : ''}`} />
      <span className={`dot ${showBees ? 'active' : ''}`} />
      <span className={`dot ${showBees ? 'active' : ''}`} />
        The Hive
           </Button>
          )}
         
          </div>
     
      </Toolbar>
    </AppBar>
  
      <Login
      open={openLogin}
      close={handleLoginClose}
      />
      </>
  );
};

export default Header;
