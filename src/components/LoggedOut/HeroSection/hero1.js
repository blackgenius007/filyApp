import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import office from '../../../assets/office.png';
import { useSelector, useDispatch } from 'react-redux';
import Register from '../Register_login/Register';
import Welcome from '../Home/Welcome/welcome';

const HeroSection = () => {
  const { user, isSuccess } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  const handleRegisterOpen = () => {
    setOpen(true);
  };

  const handleCloseReg = () => {
    setOpen(false);
  };

  const handleWelcomeOpen = () => {
    setWelcomeOpen(true);
  };

  if (user && isSuccess) {
  }
  return (
    <div
      style={{ background: 'white', paddingTop: '30px', paddingBottom: '30px' }}
    >
      <Container maxWidth="md">
        <div style={{ position: 'relative' }}>
          <img
            src={office}
            alt="Hero"
            style={{ display: 'block', margin: '0 auto', width: '85%' }}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{
              position: 'absolute',
              top: '60%',
              right: '40%',
              transform: 'translate(50%, -50%)',
            }}
            onClick={handleRegisterOpen}
          >
            Start now
          </Button>
        </div>
      </Container>
      <Register open={open} close={handleCloseReg} />
    </div>
  );
};

export default HeroSection;
