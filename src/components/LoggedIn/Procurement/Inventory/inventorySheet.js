import React, { useState, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import RightSidebar from './RightSidebar';
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



 
const InventoryTable = ({ drawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateOffset, setDateOffset] = useState(7);
  const [searched, setSearched] = useState('');
  const [add, setAdd] = useState(0);
  const [input, setInput] = useState(0);
  const [minus, setMinus] = useState(0);
  const [rowInputValues, setRowInputValues] = useState({});
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
  
  const handleAddChange =(id, quantity)=>{

	console.log('=================', id);
	var nums = parseInt(quantity) + parseInt(add);
	 console.log(nums)
}

const handleSubChange=(id, quantity)=>{

	if (parseInt(quantity) - parseInt(minus) < 0) {
		alert('The input value is too high.');
	} else {
		var nums = parseInt(quantity) - parseInt(minus);
		const order = prompt('Please enter destination of item');

		console.log(nums,order)
	}
}
 

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


  // Function to handle 'add' input change for a specific row
  const handleAddInputChange = (rowId, value) => {
    // Create a copy of the current rowInputValues object
    const updatedRowInputValues = { ...rowInputValues };   
    // Update the 'add' value for the specific row
    updatedRowInputValues[rowId] = { ...updatedRowInputValues[rowId], add: value };
    setRowInputValues(updatedRowInputValues);              
  };
     
  // Function to handle 'minus' input change for a specific row
  const handleMinusInputChange = (rowId, value) => {
    // Create a copy of the current rowInputValues object
    const updatedRowInputValues = { ...rowInputValues };
    // Update the 'minus' value for the specific row
    updatedRowInputValues[rowId] = { ...updatedRowInputValues[rowId], minus: value };
    setRowInputValues(updatedRowInputValues);
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
      <IconButton>
 		 
            </IconButton>
            <IconButton>
 	  <Popup
        trigger={<Link>         
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="12 8 12 12 14 14" />
  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />      
</svg>
	  </Link>  }    
        position="bottom center"
      >
        Inventory history            
      </Popup>              
          </IconButton>
		  <IconButton>
		  <Popup
        trigger={  <Link>        
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checkup-list" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
  <rect x="9" y="3" width="6" height="4" rx="2" />
  <path d="M9 14h.01" />
  <path d="M9 17h.01" />
  <path d="M12 16l1 1l3 -3" />
</svg>
	  </Link>  }    
        position="bottom center"
      >
        Out of stock           
      </Popup> 
          </IconButton>
  
        
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
          
            <th style={futuristicStyles.tableHeadCell}>Item image</th>
            <th style={futuristicStyles.tableHeadCell}>Item</th>
            <th style={futuristicStyles.tableHeadCell}>Category</th>
            <th style={futuristicStyles.tableHeadCell}>Location</th>
            <th style={futuristicStyles.tableHeadCell}>Description</th>
            <th style={futuristicStyles.tableHeadCell}>Supplier</th>
            <th style={futuristicStyles.tableHeadCell}>Price</th>
            <th style={futuristicStyles.tableHeadCell}>Quantity</th>
            <th style={futuristicStyles.tableHeadCell}>Modified</th>
            <th style={futuristicStyles.tableHeadCell}>Re-stock</th>
            <th style={futuristicStyles.tableHeadCell}>Out-going</th>
            {/* <th style={futuristicStyles.tableHeadCell}>Loan Expiry date</th>
            <th style={futuristicStyles.tableHeadCell}>Total Salary</th>
            <th style={futuristicStyles.tableHeadCell}>Bank name</th>
            <th style={futuristicStyles.tableHeadCell}>Bank code</th>
            <th style={futuristicStyles.tableHeadCell}>Account Number</th> */}
               
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
            <td style={futuristicStyles.tableBodyCell}>{toMoney(row.location)}</td>
            <td style={futuristicStyles.tableBodyCell}>{toMoney(row.I)}</td>
            
      <td style={futuristicStyles.tableBodyCell}>
              <input
                type="number"
                style={{
                  width: '50px',
                  padding: '5px',
                  border: 'none',
                  borderBottom: '1px solid #ddd',
                  background: 'transparent',
                  color: 'white',
                }}
                value={rowInputValues[row._id]?.add || ''}
                onChange={(e) => handleAddInputChange(row._id, e.target.value)}
              />
              <IconButton
                onClick={() => handleAddChange(row._id, row.quantity)}
                style={{ color: '#26a69a' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-plus"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#26a69a"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
             +
                </svg>
              </IconButton>
            </td>
            <td style={futuristicStyles.tableBodyCell}>
              <input
                type="number"
                style={{
                  width: '50px',
                  padding: '5px',
                  border: 'none',
                  borderBottom: '1px solid #ddd',
                  background: 'transparent',
                  color: 'white',
                }}
                value={rowInputValues[row._id]?.minus || ''}
                onChange={(e) => handleMinusInputChange(row._id, e.target.value)}
              />
              <IconButton
                onClick={() => handleSubChange(row._id, row.quantity)}
                style={{ color: '#e57373' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-transfer-out"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#e57373"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                -
                </svg>
              </IconButton>
            </td>  
            {/* <td style={futuristicStyles.tableBodyCell}>
              {row.loan
                ? moment(new Date(row.repayDate)).format('MMM Do YY')
                : '-'}
            </td> */}
            {/* {row.department.grossIncome === null ? (
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
            <td style={futuristicStyles.tableBodyCell}>{row.accountNumber}</td> */}
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
      <h1 style={{ color: '#6082B6' }}>Inventory Sheet</h1>       
          
      <InventoryTable drawer={toggleSidebar} />
      {/* Right Sidebar */}
      <RightSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}





// import React, { useState } from 'react';

// const InventoryTable = () => {
//   const initialItems = [
//     { id: 1, name: 'Item A', quantity: 10 },
//     { id: 2, name: 'Item B', quantity: 5 },
//     { id: 3, name: 'Item C', quantity: 15 },
//   ];

//   const [items, setItems] = useState(initialItems);

//   const handleChange = (itemId, newQuantity) => {
//     const updatedItems = items.map((item) =>
//       item.id === itemId ? { ...item, quantity: newQuantity } : item
//     );
//     setItems(updatedItems);
//     console.log(updatedItems);

//     // Simulate API call to backend
//     setTimeout(() => {
//       updateBackend(itemId, newQuantity);
//     }, 500);
//   };

//   const updateBackend = (itemId, newQuantity) => {
//     // Simulated API call
//     console.log(`Sending data to backend: Item ${itemId} - New Quantity: ${newQuantity}`);
//   };

//   return (
//     <div>
//       <h2>Inventory Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Current Quantity</th>
//             <th>Quantity</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.quantity}</td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     handleChange(item.id, parseInt(e.target.value, 10))
//                   }
//                 />
//               </td>
//               <td>
//                 <button onClick={() => handleChange(item.id, item.quantity + 1)}>
//                   +
//                 </button>
//                 <button onClick={() => handleChange(item.id, item.quantity - 1)}>
//                   -
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InventoryTable;

