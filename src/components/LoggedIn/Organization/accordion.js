import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddDepartment from './department';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const styles = {
  numberInput: {
    width: 120,
    '@media (max-width: 600px)': {
      width: 80,
    },
    '@media (max-width: 350px)': {
      width: 65,
    },
  },
  numberInputInput: {
    padding: '9px 14.5px',
    '@media (max-width: 380px)': {
      padding: '9px 8.5px',
    },
    '@media (max-width: 350px)': {
      padding: '9px 6.5px',
    },
  },
  listItem: {
    paddingLeft: 100,
  },
  accordionDetails: {
    paddingTop: 0,
    justifyContent: 'flex-end',
  },
  dBlock: {
    display: 'block',
  },
};

const CreateDepartment = ({ pushMessageToSnackbar }) => {

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>CREATE NEW DEPARTMENTS</Typography>
        </AccordionSummary>
        <AccordionDetails style={styles.dBlock}>
          <AddDepartment />
        </AccordionDetails>
        <AccordionDetails style={styles.accordionDetails}>
          <Box mr={1}></Box>
        </AccordionDetails>
      </Accordion>
      <div></div>
    </>
  );
};

CreateDepartment.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
};

export default CreateDepartment;
