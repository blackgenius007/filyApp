import React, { useState, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import RightSidebar from '../RightSidebar';
import {RiFileExcel2Fill} from "react-icons/ri";
import moment from 'moment';
import excelIconSvg from '../../../../assets/svg/excel-1516.svg'
import { useDownloadExcel } from 'react-export-table-to-excel';
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
import { Clear,FileCopy } from '@mui/icons-material';
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
    // borderCollapse: 'collapse',
    textAlign: 'left',
    borderCollapse: 'separate', // Separate borders for cells
    borderSpacing: '0', // No spacing between cells
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
    // padding: '0.5rem',
    // textAlign: 'center', // Align body cells to center
    border: '1px solid #444', // Add border to each cell
    padding: '0.5rem',
    textAlign: 'center',
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
    fontSize: '1.1rem',
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



 
const SalaryCalculator = ({ drawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateOffset, setDateOffset] = useState(7);
  const [searched, setSearched] = useState('');
    const [open, setOpen] = useState(false);
  const [exportMode, setExportMode] = useState(0);
  let totalRemunerationForAll = 0;
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

     

 // Function to enable export mode
 const enableExportMode = () => {
  setExportMode(true);
};

// Function to disable export mode
const disableExportMode = () => {
  setExportMode(false);
};
  const ExportSheet = () => {
    setExportMode(1);
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
      .filter((row) => row.paySchedule === 'Monthly') // Filter by paySchedule === 'weekly'
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searched.toLowerCase())
        )
      ); // Further filter by search term     

      const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedRows = filteredRows.slice(startIndex, endIndex);

      // function to calculate total payout
    
        filteredRows.map((row) =>{
          const { _id, designation } = row;
          const { grossIncome, country } = designation;
          const employeeFinancialData = financialData[_id];

          // Calculate financial data if not available
          if (!employeeFinancialData) {
            calculateFinancialData(_id, grossIncome, country);
            return null; // Render nothing for now, will be updated on next render
          }
          console.log(employeeFinancialData);
// Calculate financial data if not available
if (!employeeFinancialData) {
calculateFinancialData(_id, grossIncome, country);
return null; // Render nothing for now, will be updated on next render
}
console.log(employeeFinancialData);

// Calculate Total Remuneration
const monthlyRate =
employeeFinancialData.monthlySalary ;
 

// Calculate net Remuneration
const netRemuneration =
monthlyRate +
parseFloat(row.overtime) +
parseFloat(row.allowance) -
parseFloat(row.IOU).toFixed(2);

// Add the calculated remuneration to the total
totalRemunerationForAll += netRemuneration;
        })

      

console.log('function for salary=>',totalRemunerationForAll)
 
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

  const tableRef = useRef(null);

  // excel download function
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Salary',
    sheet: 'Users',
  });

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
        {/* <Popup
          trigger={
            <Button variant="info" color="primary" onClick={goBack}>
              <TiArrowBackOutline />
            </Button>
          }
          position="bottom center"
        >
          Go back to employee panel
        </Popup> */}

        <Popup
          trigger={
            <Button variant="info" color="primary"  >
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

       
        <Chip
          avatar={<FcRatings />}
          label="Set overtime rate"
          clickable
          style={{ backgroundColor: '#fff' }}
        />
     
        
        {exportMode ? (        
        <>
          {/* Cancel button with Clear icon */}
          <Button onClick={disableExportMode}>
            <Clear />
            Cancel
          </Button>
          {/* Excel button with SVG icon */}
          <Button onClick={ExportSheet} style={{ backgroundColor: '#E97451', color: '#ffffff' }}>
  <FileCopy style={{ color: '#ffffff' }} /> Export to Excel
</Button>

        </>
      ) : (
        <Button onClick={enableExportMode}style={{ backgroundColor: '#7393B3', color: '#ffffff' }}>
          Convert to Exportable version
        </Button>
      )}
              <Button variant="contained" onClick={drawer} style={{backgroundColor:'#E97451'}} >
        Wages Calculator
        </Button>
      {/* Button to toggle the sidebar */}
      <Button variant="contained" onClick={drawer}>
          How it works
        </Button>
        {/* Render totalRemunerationForAll in a separate table row */}
        <tr>
            <td colSpan="8" style={{ textAlign: 'right' }}>
              <strong>After Tax Aggregate Salary for All Monthly Employees:</strong>
            </td>
            <td style={{ textAlign: 'center' }}>
              
               {toMoney(totalRemunerationForAll.toFixed(2))} 
            </td>
          </tr>
    
      </label>
      <div style={futuristicStyles.tableContainer}>
        <table style={futuristicStyles.table}>
          <thead style={futuristicStyles.tableHead}>
            <tr>
          
            <th style={futuristicStyles.tableHeadCell}>Employee</th>
            <th style={futuristicStyles.tableHeadCell}>Name</th>
            <th style={futuristicStyles.tableHeadCell}>Designation</th>
            <th style={futuristicStyles.tableHeadCell}>Salary</th>
            <th style={futuristicStyles.tableHeadCell}>Allowance</th>
            <th style={futuristicStyles.tableHeadCell}>Overtime</th>
            <th style={futuristicStyles.tableHeadCell}>IOU</th>
            <th style={futuristicStyles.tableHeadCell}>Loan</th>
            <th style={futuristicStyles.tableHeadCell}>Loan repay</th>
            <th style={futuristicStyles.tableHeadCell}>Loan Expiry date</th>
            <th style={futuristicStyles.tableHeadCell}>Total Salary</th>
            <th style={futuristicStyles.tableHeadCell}>Bank name</th>
            <th style={futuristicStyles.tableHeadCell}>Bank code</th>
            <th style={futuristicStyles.tableHeadCell}>Account Number</th>
               
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
 // Calculate financial data if not available
 if (!employeeFinancialData) {
  calculateFinancialData(_id, grossIncome, country);
  return null; // Render nothing for now, will be updated on next render
}
console.log(employeeFinancialData);

// Calculate Total Remuneration
const monthlyRate =
  employeeFinancialData.monthlySalary ;
const totalRemuneration = (
  monthlyRate   +
  row.overtime +
  row.allowance -
  row.IOU
).toFixed(2);
   
// Calculate net Remuneration
const netRemuneration =
monthlyRate +
  parseFloat(row.overtime) +
  parseFloat(row.allowance) -
  parseFloat(row.IOU)         
;

// Add the calculated remuneration to the total
totalRemunerationForAll += netRemuneration;
console.log('All:',totalRemunerationForAll)
              return (
                <tr key={row.id} style={futuristicStyles.tableBodyRow}>
                {exportMode === 1 ? (
                    ''
                  ) : (
                    <td style={futuristicStyles.tableBodyCell}>
                    <img
                      src={row.imagePath}
                      alt=""
                      style={futuristicStyles.avatar}
                    />
                  </td>
                  )}
                                

                  <td style={futuristicStyles.tableBodyRow}>
              <Link
                to={ `/employee-detail/${row._id}` }
                style={{ textDecoration: 'none', color: 'white' }}
              >
                {' '}
                { employeeName}
              </Link>{' '}
            </td>

            <td style={futuristicStyles.tableBodyCell}>
              <Link
                to={ `/employee-detail/${row._id}` }
                style={{
                  color: '#ffff',
                  textDecoration: 'none',
                  backgroundImage: 'none',
                }}
              >
                {row.designation.designation}
              </Link>
            </td>
                                  
                    <td style={futuristicStyles.tableBodyCell}>
                  
                    {toMoney(employeeFinancialData.monthlySalary)}
                  </td>  

                  <td style={futuristicStyles.tableBodyCell}>
              {toMoney(row.allowance ? row.allowance : '0.00')}
            </td>
            <td style={futuristicStyles.tableBodyCell}>{toMoney(row.overtime)}</td>
            <td style={futuristicStyles.tableBodyCell}>{toMoney(row.IOU)}</td>
            <td style={futuristicStyles.tableBodyCell}>{toMoney(row.loan && row.exemptionIsOn ? row.loan : '0.00')}</td>
            <td style={futuristicStyles.tableBodyCell}>{toMoney(row.minimumRepay)}</td>
            <td style={futuristicStyles.tableBodyCell}>
              {row.loan
                ? moment(new Date(row.repayDate)).format('MMM Do YY')
                : '-'}
            </td>
            {row.department.grossIncome === null ? (
              <td style={futuristicStyles.tableBodyCell}>
                {row.loan && moment().isBefore(moment(row.repayDate))
                  ? toMoney(
                      parseInt(
                        row.designation.perhrIncome * 8 * 20 -
                          parseInt(row.minimumRepay) +
                          parseInt(row.allowance)
                      )
                    )
                  : toMoney(
                      parseInt(
                        row.department.perhrIncome * 8 * 20 +
                          parseInt(row.allowance)
                      )
                    )}
              </td>
            ) : (
              <td style={futuristicStyles.tableBodyCell}>
                {row.loan && moment().isBefore(moment(row.repayDate))
                  ? toMoney(totalRemuneration - parseInt(row.minimumRepay)
                    )
                  : toMoney( totalRemuneration 
                    )}
              </td>
            )}
             <td style={futuristicStyles.tableBodyCell}>{row.bankName}</td>
            <td style={futuristicStyles.tableBodyCell}>-</td>
            <td style={futuristicStyles.tableBodyCell}>{row.accountNumber}</td>
                  {/* <td
                    data-label="overtime total"
                    style={{ ...futuristicStyles.tableBodyCell }}
                  >
                    {toMoney(totalRemuneration)}
                  </td> */}
                </tr>
              );
            })}

            <tr>
            <td colSpan="8" style={{ textAlign: 'right' }}> 
              <strong>Total:</strong>
            </td>
            <td style={{ textAlign: 'center' }}>
              {/* {toMoney(totalRemunerationForAll.toFixed(2)/2) } */}
            </td>
          </tr>

          </tbody>
          
        </table>
        
      </div>
      <br/>
      {/* Pagination controls */}
      <div>
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
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
      <h1 style={{ color: '#6082B6' }}>Salary Schedule</h1>
      <SalaryCalculator drawer={toggleSidebar} />
      {/* Right Sidebar */}
      <RightSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}
