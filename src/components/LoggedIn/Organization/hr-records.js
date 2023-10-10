import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Grid, Typography,Popover  } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import { useSelector } from 'react-redux';
import 'react-dropdown/style.css';
import BuildIcon from '@mui/icons-material/Build';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GroupIcon from '@mui/icons-material/Group';
import AlarmIcon from '@mui/icons-material/Alarm';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
 
import EventIcon from '@mui/icons-material/Event'; // Import the icon for month
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import the icon for week

export default function AccountRecords(props) {
  const navigate = useNavigate();
  const linkStyle = {
    textDecoration: 'none',
  };
  const [selectOptions, setSelectOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [name, setName] = useState('');
  const [selectDept, setSelectDept] = useState([]);
  const [department, setDepartment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.auth);

  const handleDepartmentView = () => {
    navigate(`/department-view/${department}`);
  };

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const res = await axios.get(
          `/api/v1/employee/designation/${user.data.email}`,
          {
            params: {
              _limit: 100,
            },
          }
        );

        if (res.data) {
          const designationData = res.data;

          const designationOptions = designationData.map((designation) => ({
            value: designation._id,
            label: designation.designation,
          }));

          setSelectOptions(designationOptions);
        }
      } catch (error) {
        console.error('Error fetching designation data:', error);
      }
    };

    const fetchDepartmentData = async () => {
      try {
        const departmentOptions = user.data.departmentAdded.map(
          (department, i) => ({
            value: i,
            label: department.replace(/\\/g, '').replace(/"/g, '').trim(),
          })
        );

        setOptions(departmentOptions);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchDesignation();
    fetchDepartmentData();
  }, []);

  const defaultOption = selectDept['Select Department'];
  const defaultOption2 = selectOptions['Select Designation'];
  const handleDepartmentChange = (e) => {
    setDepartment(e.label);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <div style={{ width: '100%' }}>
          <Dropdown
            options={options}
            onChange={handleDepartmentChange}
            value={null}
            placeholder="Select a Department"
            style={{ marginBottom: '2rem', height: '10px' }}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleDepartmentView}
        >
          Go to Department
        </Button>
      </Box>
      <br/>
      <br/>
      <br/>
      {/* Third Row */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Link to="/employee" style={linkStyle}>
            <Box textAlign="center" border={1} borderRadius={2} p={2} boxShadow={3}>
              <Typography variant="h6">
           
                <SupervisedUserCircleIcon fontSize="large" color="primary" />
               
                <p style={{color:'black'}}>Work Force</p>
              </Typography>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
          <Link to="/attendance" style={linkStyle}>
            <Box textAlign="center" border={1} borderRadius={2} p={2} boxShadow={3}>
              <Typography variant="h6">
                <AlarmIcon fontSize="large" color="primary" />
                <p>Attendance</p>
              </Typography>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
          <div>
      <Box
        textAlign="center"
        border={1}
        borderRadius={2}
        p={2}
        boxShadow={3}
        onClick={handlePopoverOpen}
      >
        <Typography variant="h6">
          <AttachMoneyIcon fontSize="large" color="primary" />
          <p>Wages/Salary</p>
        </Typography>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* Content of your sub-menu */}
        <Box p={2}>
        <Link to="/salary"  style={linkStyle}>
          <Button
          style={{backgroundColor:'#E97451'}}
            variant="contained"
            startIcon={<EventIcon />} // Icon for month
            onClick={() => {
              // Handle the month button click here
              handlePopoverClose();
            }}       
          >
             Salary Schedule
          </Button>
          </Link>
          <Link to="/wages-salary"  style={linkStyle}>
          <Button
            variant="contained"
            style={{backgroundColor:'#4169E1'}}
            startIcon={<CalendarTodayIcon />} // Icon for week
            onClick={() => {
              // Handle the week button click here
              handlePopoverClose();
            }}
          >
          Wages cal 
          </Button>
          </Link>
          
        </Box>
      </Popover>
    </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
