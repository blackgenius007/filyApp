import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import RightSidebar from '../RightSidebar';
import Swal from 'sweetalert2';
import {
  calculateTaxAsync,
  addAllowance,
  allowanceReset,
  addOvertime,
  addIOU,
  overtimeReset,
} from '../../../Services/AccountServices/financialSlice';
import accounting from 'accounting-js';
import { retrieveAllAttendance } from '../../../Services/HR-Services/employeeSlice';
import { Clear } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import { TiArrowBackOutline } from 'react-icons/ti';
import { FcDataConfiguration, FcOvertime, FcRatings } from 'react-icons/fc';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PersonOutline } from '@mui/icons-material';
import { Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconContext } from 'react-icons';

import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Popup } from 'semantic-ui-react';
import face from '../../../../assets/face-0.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BsChevronDoubleLeft,
  BsFlagFill,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleRight,
} from 'react-icons/bs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

// Add futuristic styles here...
const futuristicStyles = {
  tableContainer: {
    background: '#222',
    borderRadius: '10px',
    padding: '1rem',
  },
  table: {
    color: '#fff',
    // width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHead: {
    background: '#333',
  },
  tableHeadCell: {
    padding: '0.5rem',
    textAlign: 'center', // Align header cells to center
  },
  tableBodyRow: {
    borderBottom: '1px solid #444',
  },
  tableBodyCell: {
    padding: '0.5rem',
    textAlign: 'center', // Align body cells to center
  },
  avatar: {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#00aaff',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
    padding: 0,
    margin: 0,
  },
  actionIcons: {
    fontSize: '1.2rem',
    color: '#fff',
    marginRight: '0.5rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
  },
};

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
const WagesCalculator = ({ drawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateOffset, setDateOffset] = useState(7);
  const [searched, setSearched] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  let totalRemunerationForAll = 0;
  //user details
  const { role, email, ownerEmail } = useSelector(
    (state) => state.auth.user.data
  );
  // user role
  const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
  console.log(userEmail);

  //fetch attendance details
  useEffect(() => {
    dispatch(retrieveAllAttendance({ userEmail, dateOffset }));
  }, [dispatch, userEmail, dateOffset]);

  // Retrieve attendance data from employeeSlice
  const { attendance } = useSelector((state) => state.employees);
  // Retrieve financial data from financialSlice
  const financialData = useSelector((state) => state.financial);
  console.log(attendance, financialData);

  // Function to trigger financial data calculation
  const calculateFinancialData = (employeeId, grossIncome, country) => {
    console.log(
      'front-calculateFinancialData:',
      employeeId,
      grossIncome,
      country
    );
    dispatch(calculateTaxAsync({ employeeId, grossIncome, country }));
  };
  // search function
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
  };

  // function to add overtime
  const AddOvertime = (id, employee) => {
    // alert(id)
    Swal.fire({
      title: `${employee}`,
      text: 'standard employee overtime rate is 1.5 (1.5 multiply by normal hourly rate)',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Add Overtime hr',
      showLoaderOnConfirm: true,
      preConfirm: async (result) => {
        try {
          const response = await dispatch(addOvertime({ id, value: result }));
          console.log('response=>', response);
          if (response.meta.requestStatus === 'fulfilled') {
            Swal.fire({
              title: 'Add Overtime',
              text: 'Successful!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            throw new Error(
              'Adding overtime failed: Response was not successful'
            );
          }
        } catch (error) {
          console.error('Error adding overtime:', error); // Log the detailed error
          Swal.showValidationMessage(`An error occurred: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const overtimeReset = () => {
    // const { user } = auth;
    // const email = user.email;
    let overtime = parseInt(0);
    axios.post(`/api/v1/employee/overtimeReset/${email}/ ${overtime}`).then(
      (res) => {
        Swal.fire({
          title: 'Overtime Reset',
          text: 'Successful!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      (err) => {
        alert('An error occurred! Try submitting the form again.', err);
      }
    );
  };

  const goBack = () => {};

  // Add allowance
  const AddAllowance = (id, employee) => {
    Swal.fire({
      title: `${employee}`,
      text: '',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Add allowance',
      showLoaderOnConfirm: true,
      preConfirm: async (result) => {
        try {
          const response = await dispatch(addAllowance({ id, value: result }));
          console.log('response=>', response);
          if (response.meta.requestStatus === 'fulfilled') {
            Swal.fire({
              title: 'Add Allowance',
              text: 'Successful!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            throw new Error(
              'Adding overtime failed: Response was not successful'
            );
          }
        } catch (error) {
          console.error('Error adding overtime:', error); // Log the detailed error
          Swal.showValidationMessage(`An error occurred: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  // Add allowance
  const AddIOU = (id, employee) => {
    Swal.fire({
      title: `${employee}`,
      text: '',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Add IOU',
      showLoaderOnConfirm: true,
      preConfirm: async (result) => {
        try {
          const response = await dispatch(addIOU({ id, value: result }));
          console.log('response=>', response);
          if (response.meta.requestStatus === 'fulfilled') {
            Swal.fire({
              title: 'Add IOU',
              text: 'Successful!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            throw new Error(
              'Adding overtime failed: Response was not successful'
            );
          }
        } catch (error) {
          console.error('Error adding overtime:', error); // Log the detailed error
          Swal.showValidationMessage(`An error occurred: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  // function to reset allowance
  const AllowanceReset = () => {
    Swal.fire({
      title: 'Allowance Reset',
      text: 'Are you sure you want to reset the allowance?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reset',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let overtime = parseInt(0);
          const response = await dispatch(allowanceReset({ email, overtime }));

          if (response.success) {
            Swal.fire({
              title: 'Allowance Reset',
              text: 'Successful!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            throw new Error('Allowance reset failed'); // You can customize the error message
          }
        } catch (error) {
          Swal.showValidationMessage(`An error occurred: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const filteredRows =
    attendance &&
    attendance
      .filter((row) => row.paySchedule === 'weekly') // Filter by paySchedule === 'weekly'
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searched.toLowerCase())
        )
      ); // Further filter by search term

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  // Time shift buttons
  const handleForwardClick = () => {
    setDateOffset(dateOffset + 1);
  };

  const handleBackwardClick = () => {
    setDateOffset(dateOffset - 1);
  };

  const handle30DaysClick = () => {
    setDateOffset(30);
  };

  const handle7DaysClick = () => {
    setDateOffset(7);
  };

  // convert currency
  const toMoney = (value) => {
    return accounting.formatMoney(accounting.unformat(value), {
      symbol: '',
      precision: 2,
    });
  };

  // Dialogue box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          label="Search database"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searched && (
                  <IconButton onClick={() => requestSearch('')}>
                    <Clear />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <br />
      <label>
        <Popup
          trigger={
            <Button variant="info" color="primary" onClick={goBack}>
              <TiArrowBackOutline />
            </Button>
          }
          position="bottom center"
        >
          Go back to employee panel
        </Popup>

        <Popup
          trigger={
            <Button variant="info" color="primary" onClick={overtimeReset}>
              <IconContext.Provider value={{ color: 'grey', size: '25px' }}>
                <FcOvertime />
              </IconContext.Provider>
            </Button>
          }
          position="bottom center"
        >
          Reset all employee overtime to zero
        </Popup>

        <IconButton>
          <Popup
            trigger={
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-businessplan"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#9e9e9e"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <ellipse cx="16" cy="6" rx="5" ry="3" />
                  <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                  <path d="M5 15v1m0 -8v1" />
                </svg>
              </Link>
            }
            position="bottom center"
          >
            Reset all employee allowance to zero   
          </Popup>
        </IconButton>

        <Button className="btn" title="Stop" onClick={handle30DaysClick}>
          <BsChevronDoubleRight />
        </Button>

        <Button
          className="btn"
          title="Go back in time"
          onClick={handleBackwardClick}
        >
          <BsChevronLeft />
        </Button>

        <Button
          className="btn"
          title="Go forward in time"
          onClick={handleForwardClick}
        >
          <BsChevronRight />
        </Button>

        <Button className="btn" title="Last 7 days" onClick={handle7DaysClick}>
          <BsChevronDoubleLeft />
        </Button>

        <Chip
          avatar={<FcRatings />}
          label="Set overtime rate"
          clickable
          style={{ backgroundColor: '#fff' }}
        />
             <Button variant="contained" onClick={drawer} style={{backgroundColor:'#E97451'}} >
         View Salary
        </Button>
        {/* Button to toggle the sidebar */}
        <Button variant="contained" onClick={drawer}>
          How it works
        </Button>
   
      </label>
      <div style={futuristicStyles.tableContainer}>
        <table style={futuristicStyles.table}>
          <thead style={futuristicStyles.tableHead}>
            <tr>
              <th style={futuristicStyles.tableHeadCell}>Name</th>
              <th style={futuristicStyles.tableHeadCell}></th>

              <th style={futuristicStyles.tableHeadCell}>
                {`Attendance in the last  ${dateOffset} days`}
              </th>
              <th style={futuristicStyles.tableHeadCell}>WorkHrRate</th>
              <th style={futuristicStyles.tableHeadCell}>Additions</th>
              <th style={futuristicStyles.tableHeadCell}>Overtime</th>
              <th style={futuristicStyles.tableHeadCell}>Allowance</th>
              <th style={futuristicStyles.tableHeadCell}>IOU</th>
              <th style={futuristicStyles.tableHeadCell}>Total Renumeration</th>
              {/* <th style={futuristicStyles.tableHeadCell}>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              console.log('in-map:', row);
              const { _id, employeeName, designation } = row;
              const { grossIncome, country } = designation;
              const employeeFinancialData = financialData[_id];

              // Calculate financial data if not available
              if (!employeeFinancialData) {
                calculateFinancialData(_id, grossIncome, country);
                return null; // Render nothing for now, will be updated on next render
              }
              console.log(employeeFinancialData);

              // Calculate Total Remuneration
              const hourlyRate =
                employeeFinancialData.monthlySalary / (40 * 4.33);
              const totalRemuneration = (
                hourlyRate * row.numberofPresentAttendances +
                row.overtime +
                row.allowance -
                row.IOU
              ).toFixed(2);

              // Calculate net Remuneration
              const netRemuneration =
                hourlyRate * row.numberofPresentAttendances +
                parseFloat(row.overtime) +
                parseFloat(row.allowance)-
                parseFloat(row.IOU);

              // Add the calculated remuneration to the total
              totalRemunerationForAll += netRemuneration;

              return (
                <tr key={row.id} style={futuristicStyles.tableBodyRow}>
                  <td style={futuristicStyles.tableBodyCell}>{employeeName}</td>
                  <td style={futuristicStyles.tableBodyCell}>
                    <img
                      src={row.imagePath}
                      alt=""
                      style={futuristicStyles.avatar}
                    />
                  </td>

                  <td style={futuristicStyles.tableBodyCell}>
                    {row.numberofPresentAttendances}
                  </td>
                  <td data-label="overtime total">
                    {/* {getSymbolFromCurrency(row.currency)} */}
                    {toMoney(employeeFinancialData.monthlySalary / (40 * 4.33))}
                  </td>
                  <div>
                    <td data-label="overtime +">
                      <ButtonGroup>
                        <IconButton
                          onClick={(e) =>
                            AddOvertime(row._id, row.employeeName)
                          }
                        >
                          <Popup
                            trigger={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-alarm"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#ffffff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <circle cx="12" cy="13" r="7" />
                                <polyline points="12 10 12 13 14 13" />
                                <line x1="7" y1="4" x2="4.25" y2="6" />
                                <line x1="17" y1="4" x2="19.75" y2="6" />
                              </svg>
                            }
                            position="bottom center"
                          >
                            Add overtime
                          </Popup>
                        </IconButton>
                        <IconButton
                          onClick={(e) =>
                            AddAllowance(row._id, row.employeeName)
                          }
                        >
                          <Popup
                            trigger={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-businessplan"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#ffffff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <ellipse cx="16" cy="6" rx="5" ry="3" />
                                <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                <path d="M5 15v1m0 -8v1" />
                              </svg>
                            }
                            position="bottom center"
                          >
                            Add allowance
                          </Popup>
                        </IconButton>
                        <IconButton
                          onClick={(e) => AddIOU(row._id, row.employeeName)}
                        >
                          <Popup
                            trigger={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-wallet"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#ffffff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"   
                                  fill="none"
                                />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                              </svg>
                            }
                            position="bottom center"
                          >
                            Add IOU
                          </Popup>
                        </IconButton>
                      </ButtonGroup>
                    </td>
                  </div>
                  <td
                    data-label="overtime"
                    style={{ ...futuristicStyles.tableBodyCell }}
                  >
                    {row.overtime}
                  </td>
                  <td
                    data-label="allowance"
                    style={{ ...futuristicStyles.tableBodyCell }}
                  >
                    {row.allowance}
                  </td>
                  <td data-label="IOU">{row.IOU}</td>
                  <td
                    data-label="overtime total"
                    style={{ ...futuristicStyles.tableBodyCell }}
                  >
                    {toMoney(totalRemuneration)}
                  </td>
                </tr>
              );
            })}

             {/* Render totalRemunerationForAll in a separate table row */}
  <tr>
    <td colSpan="8" style={{ textAlign: 'right' }}>
      <strong>Aggregate Compensation for All Hourly-Paid Employees:</strong>
    </td>
    <td style={{ textAlign: 'center' }}>{toMoney(totalRemunerationForAll.toFixed(2))}</td>
  </tr>
          </tbody>
          
        </table>
        
      </div>
    </>
  );
};

export default function MainPage() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Horizontally center the content
    justifyContent: 'center', // Vertically center the content
    // height: '75vh', // Set the height of the container to full viewport height
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#6082B6' }}>Wages Calculator</h1>
      <WagesCalculator drawer={toggleSidebar} />
      {/* Right Sidebar */}
      <RightSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}
