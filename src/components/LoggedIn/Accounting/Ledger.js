import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import accounting from 'accounting-js';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  addLoan,
  updateLoan,
  loanPayOff,
} from '../../Services/AccountServices/financialSlice';
import Collapsible from 'react-collapsible';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateIcon from '@mui/icons-material/Create';
import UploadFiles from '../HR/Files/uploadFile';
import FileViewer from '../HR/Files/fileViewer';
import TextArea from '../HR/Files/textArea';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import AddFundsDialog from './AddFundsDialog ';
import WithdrawFundsDialog from './WithdrawFundsDialog';
import LoanIcon from '@mui/icons-material/LocalAtm';
import loan from '../../../assets/svg/loan.svg';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const Ledger = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [openingBalance, setOpeningBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [OpenFiles, setOpenFiles] = useState(false);
  const [OpenUpload, setOpenUpload] = useState(false);
 
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [messages, setMessages] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [complains, setComplains] = useState('Unpaid salary');
  const [queries, setQueries] = useState('Lateness to work 6/18/23');
  const [requests, setRequests] = useState('');
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  // const [amount, setAmount] = useState({});
  const [currentLoan, setCurrentLoan] = useState(0);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    ait: 0,
    investment: 0,
  });
  const [loan, setLoan] = useState({
    loanAmount: '',
    minimumRepay: '',
  });
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };


  // Save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleLoanAmountChange(e) {
    const { name, value } = e.target;
    setLoan((loan) => ({ ...loan, [name]: value }));
  }
  const repayDate = moment()
    .add(loan.loanAmount / loan.minimumRepay, 'months')
    .calendar();

  const handleConfirmSubmit = (e) => {
    e.preventDefault();

    const { loanAmount, minimumRepay } = loan;
    const repayDetail = {
      loanAmount,
      minimumRepay,
      id,
      repayDate,
    };
    if (loan) {
      console.log('repayetail:', repayDetail);

      setConfirmationOpen(true); // Open the verification dialog
    }
  };

  // handle submit loan
  const handleLoanSubmit = async (e) => {
    e.preventDefault();

    const { loanAmount, minimumRepay, repayDate } = loan;
    const loanDetail = {
      loanAmount,
      minimumRepay,
      id,
      repayDate,
    };

    try {
      const response = await dispatch(addLoan({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('Successfully submitted, disbursement can be initiated!');
      } else {
        throw new Error('Adding loan failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmationOpen(false); // Close the dialog if cancel is clicked
  };

  const handleExemption = async () => {
    const { loanAmount, minimumRepay, repayDate } = loan;

    // Parse the current repayDate using Moment
    const currentRepayDate = moment(repayDate);

    // Add one month to the current repayDate
    const adjustedRepayDate = currentRepayDate.add(1, 'months');

    // Format the adjustedRepayDate as a string in the desired format
    const adjustedRepayDateFormatted = adjustedRepayDate.format('YYYY-MM-DD');

    const exemptBy = loanAmount / minimumRepay + 1;
    const ExemptBy = moment().add(exemptBy, 'months').calendar();

    const loanDetail = {
      id,
      ExemptBy,
      repayDate: adjustedRepayDateFormatted, // Include the adjusted repayDate
    };
    console.log('exempted=>', loanDetail);
    try {
      const response = await dispatch(updateLoan({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage(
          'The loan expiry date has been successfully adjusted forward by one month.'
        );
      } else {
        throw new Error('Adding loan failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleLoanPayoff = async (id, loan) => {
    const today = moment();

    const loanDetail = {
      id,
      today,
    };

    try {
      const response = await dispatch(loanPayOff({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('Successfully paid off remaining loan!');
      } else {
        throw new Error('Pay Off failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  // Petty cash functionality section
  const addEntry = () => {
    if (description && amount) {
      if (closingBalance === 0) {
        alert('Insufficient Balance. Add to balance first.');
        return;
      }
      const newEntry = { description, amount: parseFloat(amount) };
      setEntries([...entries, newEntry]);
      setDescription('');
      setAmount('');
      updateBalances(-newEntry.amount);
    }
  };

  const addBalance = () => {
    if (amount) {
      updateBalances(parseFloat(amount));
      setAmount('');
    }
  };

  const updateBalances = (entryAmount) => {
    setOpeningBalance(closingBalance);
    setClosingBalance(closingBalance + entryAmount);
  };

  // Todo functions
  const handleAddTodo = () => {
    if (newTodo && newTodo.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodo(''); // Clear the input field after adding the todo
    }
  };

  // Open files
  const handleFileOpen = () => {
    setOpenFiles(true);
  };

  const handleFileClose = () => {
    setOpenFiles(false);
  };
  // Open upload

  const handleUploadOpen = () => {
    setOpenUpload(true);
  };

  const handleUploadClose = () => {
    setOpenUpload(false);
  };

  // Open textArea
  // const handleTextOpen = () => {
  //   setMessage('');
  //   setId(user.data._id);
  //   setTextOpen(true); // Open the dialog or component as needed
  // };

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen); // Toggle the collapse state
  };

  const handleSend = () => {
    // Handle sending the text content, e.g., sending it as a message
    console.log("Sending text:", text);
  };
  
  // convert currency
  const toMoney = (value) => {
    return accounting.formatMoney(accounting.unformat(value), {
      symbol: '',
      precision: 2,
    });
  };
  return (
    <>
      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MonetizationOnIcon
              style={{ fontSize: '32px', marginRight: '10px' }}
            />
            <div>
              <p style={{ fontSize: '24px', marginBottom: '2px' }}>
                Employee interest free loans{' '}
              </p>
              <p style={{ fontSize: '10px', color: '#888' }}>
                Enter loan amount and monthly repayment
              </p>
            </div>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
          >
            <input
              type="number"
              placeholder="Loan Amount"
              name="loanAmount"
              value={loan.loanAmount}
              onChange={handleLoanAmountChange}
              style={{
                padding: '3px',
                fontSize: '10px',
                width: '60px',
                marginRight: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="number"
              placeholder="Monthly Repayment"
              name="minimumRepay"
              value={loan.minimumRepay}
              onChange={handleLoanAmountChange}
              style={{
                padding: '3px',
                fontSize: '10px',
                width: '60px',
                marginRight: '5px',
                border: '1px solid #ccc',
              }}
            />
            <Button
              onClick={handleConfirmSubmit}
              style={{
                backgroundColor: '#FFD300',
                fontSize: '10px',
                padding: '3px 6px',
              }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleExemption}
              style={{ fontSize: '8px', padding: '3px 6px', marginLeft: '5px' }}
            >
              Exempt (+1 Month)
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={handleLoanPayoff}
              style={{ fontSize: '8px', padding: '3px 6px', marginLeft: '5px' }}
            >
              Payoff (100%)
            </Button>
          </div>
        </div>
      </div>
      <span>{message}</span>
      <Collapsible
        trigger={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            // disabled={isLoading}
            // onClick={handleFinalSubmit}
          >
            Petty Cash
          </Button>
        }
      >
        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
            background: '#1a1a1a',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Your Employee Details section remains here */}

          {/* Modified Ledger Component */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <label htmlFor="description" style={{ marginBottom: '5px' }}>
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                padding: '3px',
                fontSize: '12px',
                width: '100%',
                maxWidth: '150px',
                marginBottom: '5px',
              }}
            />
            <label htmlFor="amount" style={{ marginBottom: '5px' }}>
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: '3px',
                fontSize: '12px',
                width: '100%',
                maxWidth: '80px',
                marginBottom: '5px',
              }}
            />
            <button
              onClick={addEntry}
              style={{
                background: '#00aaff',
                color: '#fff',
                padding: '3px 8px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                marginBottom: '5px',
              }}
            >
              Add Entry
            </button>
            <button
              onClick={addBalance}
              style={{
                background: '#00aaff',
                color: '#fff',
                padding: '3px 8px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                marginBottom: '5px',
              }}
            >
              Add to Balance
            </button>
          </div>
          <ul style={{ margin: '10px 0', padding: '0', listStyle: 'none' }}>
            {entries.map((entry, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '5px 0',
                  padding: '5px',
                  backgroundColor: '#222',
                  borderRadius: '5px',
                }}
              >
                <span
                  style={{
                    flex: '1',
                    fontSize: '12px',
                    fontFamily: 'Your-Handwriting-Font, cursive',
                    textAlign: 'center',
                  }}
                >
                  {entry.description}
                </span>
                <span
                  style={{
                    flex: '0 0 60px',
                    textAlign: 'right',
                    fontSize: '12px',
                    fontFamily: 'Your-Handwriting-Font, cursive',
                  }}
                >
                  {entry.amount}
                </span>
              </li>
            ))}
          </ul>
          <div>
            <p style={{ margin: '3px 0', fontSize: '12px' }}>
              Opening Balance:{toMoney(openingBalance)}
            </p>
            <p style={{ margin: '3px 0', fontSize: '12px' }}>
              Closing Balance: {toMoney(closingBalance)}
            </p>
            <p style={{ margin: '3px 0', fontSize: '12px' }}>
              Total Cost of Entries:{' '}
              {toMoney(
                entries.reduce((total, entry) => total + entry.amount, 0)
              )}
            </p>
          </div>
        </div>
      </Collapsible>
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          background: '#f5f5f5',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Employee Status */}

        {/* ... (existing code) */}

        {/* Icon Grid */}
        <div
          style={{
            marginTop: '20px',
            background: '#1a1a1a',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2
            style={{
              borderBottom: '2px solid #ddd',
              paddingBottom: '5px',
              fontSize: '18px',
              margin: '0 0 10px',
              color: '#fff',
            }}
          >
            Official Records
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={handleUploadOpen}
                startIcon={<PublishIcon />}
                style={{
                  color: '#b8e6ff',
                  borderColor: '#b8e6ff',
                  fontSize: '14px',
                }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                startIcon={<InsertDriveFileIcon />}
                onClick={handleFileOpen}
                style={{
                  color: '#b8e6ff',
                  borderColor: '#b8e6ff',
                  fontSize: '14px',
                }}
              >
                Files
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={toggleCollapse}
                startIcon={<CreateIcon />}
                style={{
                  color: '#b8e6ff',
                  borderColor: '#b8e6ff',
                  fontSize: '14px',
                }}
              >
                Write
              </Button>
            </Grid>
            {/* Add more icons as needed */}
          </Grid>
        </div>
      </div>
      <Collapsible open={collapseOpen}>
      <div>
      <h2> Comments</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          width: '100%',
          height: '200px',
          padding: '10px',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ccc',
          borderRadius: '5px',
          resize: 'vertical',
        }}
        placeholder="Type your elaborate text here..."
      />
      <p style={{ textAlign: 'right' }}>
        Character Count: {text.length}
      </p>
      <button
        onClick={handleSend}
        style={{
          background: '#00aaff',
          color: '#fff',
          padding: '8px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Send
      </button>
    </div>       

      </Collapsible>

      {/* Verification Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <DialogTitle>
          Are you sure you want to submit the following loan details?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Loan Amount: <strong>{toMoney(loan.loanAmount)}</strong>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Minimum Repay: <strong>{toMoney(loan.minimumRepay)}</strong>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Repay Date: <strong>{repayDate}</strong>
            </div>
            {message && (
              <div
                style={{
                  marginTop: '20px',
                  color: '#E97451',
                  fontSize: '14px',
                }}
              >
                {message}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoanSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <FileViewer open={OpenFiles} close={handleFileClose} id={id} />
      <UploadFiles close={handleUploadClose} open={OpenUpload} id={id} />
 
     
    </>
  );
};

export default Ledger;

// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import { addLoan } from '../../Services/AccountServices/financialSlice';
// import Collapsible from 'react-collapsible';
// import Grid from '@mui/material/Grid';
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { Button } from '@mui/material';
// import PublishIcon from '@mui/icons-material/Publish';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import CreateIcon from '@mui/icons-material/Create';
// import LoanIcon from '@mui/icons-material/LocalAtm';
// import loan from '../../../assets/svg/loan.svg';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContentText,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from '@mui/material';

// const Ledger = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [balance, setBalance] = useState(0);
//   const [openingBalance, setOpeningBalance] = useState(1000); // Default opening balance
//   const [fundsAdded, setFundsAdded] = useState(0); // Amount added to the balance
//   const [fundsInput, setFundsInput] = useState('');
//   const [withdrawalAmount, setWithdrawalAmount] = useState(0); // Amount withdrawn from the balance
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [complains, setComplains] = useState('Unpaid salary');
//   const [queries, setQueries] = useState('Lateness to work 6/18/23');
//   const [requests, setRequests] = useState('');
//   const [todos, setTodos] = useState(() => {
//     const storedTodos = localStorage.getItem('todos');
//     return storedTodos ? JSON.parse(storedTodos) : [];
//   });
//   const [newTodo, setNewTodo] = useState('');
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [amount, setAmount] = useState({});
//   const [currentLoan, setCurrentLoan] = useState(0);
//   const [values, setValues] = useState({
//     ait: 0,
//     investment: 0,
//   });
//   const [loan, setLoan] = useState({
//     loanAmount: '',
//     minimumRepay: '',
//   });

//   // Save todos to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }, [todos]);

//   // Calculate the closing balance
//   const closingBalance = openingBalance + fundsAdded - withdrawalAmount;

//   // Function to fetch the balance from the server
//   const fetchBalanceFromServer = async () => {
//     try {
//       const response = await axios.get('/api/getBalance'); // Replace with your API endpoint
//       const balanceFromServer = response.data.balance;
//       setBalance(balanceFromServer);
//       // Save the balance in local storage for future use
//       localStorage.setItem('balance', balanceFromServer.toString());
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//     }
//   };

//   // Function to save the balance on the server and in local storage
//   const saveBalanceOnServer = async () => {
//     try {
//       await axios.post('/api/saveBalance', { balance }); // Replace with your API endpoint
//     } catch (error) {
//       console.error('Error saving balance:', error);
//     }
//   };

//   const handleAddTodo = () => {
//     if (newTodo && newTodo.trim() !== '') {
//       setTodos((prevTodos) => [...prevTodos, newTodo]);
//       setNewTodo(''); // Clear the input field after adding the todo
//     }
//   };

//   function handleLoanAmountChange(e) {
//     const { name, value } = e.target;
//     setLoan((loan) => ({ ...loan, [name]: value }));
//   }
//   const repayDate = moment()
//     .add(loan.loanAmount / loan.minimumRepay, 'months')
//     .calendar();

//   const handleConfirmSubmit = (e) => {
//     e.preventDefault();

//     const { loanAmount, minimumRepay } = loan;
//     const repayDetail = {
//       loanAmount,
//       minimumRepay,
//       id,
//       repayDate,
//     };
//     if (loan) {
//       console.log('repayetail:', repayDetail);

//       setConfirmationOpen(true); // Open the verification dialog
//     }
//   };

//   const handleLoanSubmit = (e) => {
//     e.preventDefault();

//     const { loanAmount, minimumRepay } = loan;
//     const loanDetail = {
//       loanAmount,
//       minimumRepay,
//       id,
//       repayDate,
//     };

//     dispatch(addLoan({loanDetail}));
//   }

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false); // Close the dialog if cancel is clicked
//   };

//   // Handle the input for adding funds
//   const handleAddFunds = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleFundsInputChange = (event) => {
//     setFundsInput(event.target.value);
//   };

//   // const handleAddFunds = () => {
//   //   const fundsToAdd = parseInt(prompt('Enter the amount to add to the balance:') || 0);
//   //   setOpeningBalance(openingBalance + fundsToAdd);
//   //   setFundsAdded(fundsAdded + fundsToAdd);
//   //   // Update the main balance in state
//   //   setBalance(balance + fundsToAdd);
//   // };

//   // Handle the input for withdrawing funds
//   const handleWithdrawFunds = () => {
//     const fundsToWithdraw = parseInt(
//       prompt('Enter the amount to withdraw from the balance:') || 0
//     );
//     setOpeningBalance(openingBalance - fundsToWithdraw);
//     setWithdrawalAmount(withdrawalAmount + fundsToWithdraw);
//     // Update the main balance in state
//     setBalance(balance - fundsToWithdraw);
//   };

//   // Update the balance in state when it changes
//   const handleBalanceChange = (event) => {
//     setBalance(parseFloat(event.target.value));
//   };

//   // Function to handle exemption
//   const handleExemption = () => {
//     // Your exemption logic here
//     console.log('Exemption added!');
//   };

//   // Function to handle loan payoff
//   const handleLoanPayoff = () => {
//     // Your loan payoff logic here
//     console.log('Loan payoff!');
//   };

//   return (
//     <>
//       <div
//         style={{
//           marginBottom: '20px',
//           padding: '10px',
//           border: '1px solid #ccc',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <div style={{ flex: 1 }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <MonetizationOnIcon
//               style={{ fontSize: '32px', marginRight: '10px' }}
//             />
//             <div>
//               <p style={{ fontSize: '24px', marginBottom: '2px' }}>
//                 Employee interest free loans{' '}
//               </p>
//               <p style={{ fontSize: '10px', color: '#888' }}>
//                 Enter loan amount and monthly repayment
//               </p>
//             </div>
//           </div>
//           <div
//             style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
//           >
//             <input
//               type="number"
//               placeholder="Loan Amount"
//               name="loanAmount"
//               value={loan.loanAmount}
//               onChange={handleLoanAmountChange}
//               style={{
//                 padding: '3px',
//                 fontSize: '10px',
//                 width: '60px',
//                 marginRight: '5px',
//                 border: '1px solid #ccc',
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Monthly Repayment"
//               name="minimumRepay"
//               value={loan.minimumRepay}
//               onChange={handleLoanAmountChange}
//               style={{
//                 padding: '3px',
//                 fontSize: '10px',
//                 width: '60px',
//                 marginRight: '5px',
//                 border: '1px solid #ccc',
//               }}
//             />
//             <Button
//               onClick={handleConfirmSubmit}
//               style={{
//                 backgroundColor: '#FFD300',
//                 fontSize: '10px',
//                 padding: '3px 6px',
//               }}
//             >
//               Submit
//             </Button>
//             <Button
//               variant="contained"
//               color="warning"
//               onClick={handleExemption}
//               style={{ fontSize: '8px', padding: '3px 6px', marginLeft: '5px' }}
//             >
//               Exempt (+1 Month)
//             </Button>
//             <Button
//               variant="contained"
//               color="warning"
//               onClick={handleLoanPayoff}
//               style={{ fontSize: '8px', padding: '3px 6px', marginLeft: '5px' }}
//             >
//               Payoff (100%)
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Collapsible
//         trigger={
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             size="large"
//             color="secondary"
//             // disabled={isLoading}
//             // onClick={handleFinalSubmit}
//           >
//             Petty Cash
//           </Button>
//         }
//       >
//         <div
//           style={{
//             fontFamily: 'Arial, sans-serif',
//             color: '#fff',
//             background: '#1a1a1a',
//             padding: '10px',
//             borderRadius: '8px',
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
//           }}
//         >
//           <h2
//             style={{
//               borderBottom: '2px solid #ddd',
//               paddingBottom: '5px',
//               fontSize: '18px',
//               margin: '0 0 10px',
//             }}
//           >
//             Employee Details
//           </h2>
//           <label
//             htmlFor="balance"
//             style={{ display: 'block', margin: '5px 0' }}
//           >
//             Balance:
//           </label>
//           <input
//             type="number"
//             id="balance"
//             value={balance}
//             onChange={handleBalanceChange}
//             style={{ padding: '5px', fontSize: '14px' }}
//           />

//           {/* Ledger Component */}
//           <div
//             style={{
//               marginTop: '10px',
//               background: '#333',
//               padding: '10px',
//               borderRadius: '8px',
//               boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
//             }}
//           >
//             <h2
//               style={{
//                 borderBottom: '2px solid #ddd',
//                 paddingBottom: '5px',
//                 fontSize: '18px',
//                 margin: '0 0 10px',
//               }}
//             >
//               Ledger Component
//             </h2>
//             <p style={{ margin: '5px 0', fontSize: '14px' }}>
//               Opening Balance: ${openingBalance}
//             </p>
//             <p style={{ margin: '5px 0', fontSize: '14px' }}>
//               Funds Added: ${fundsAdded}
//             </p>
//             <p style={{ margin: '5px 0', fontSize: '14px' }}>
//               Withdrawal Amount: ${withdrawalAmount}
//             </p>
//             <p style={{ margin: '5px 0', fontSize: '14px' }}>
//               Closing Balance: ${closingBalance}
//             </p>
//             <div style={{ marginTop: '10px' }}>
//               <button
//                 onClick={handleAddFunds}
//                 style={{
//                   background: '#00aaff',
//                   color: '#fff',
//                   padding: '8px 15px',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   marginRight: '5px',
//                   fontSize: '14px',
//                 }}
//               >
//                 Add Funds
//               </button>
//               <button
//                 onClick={handleWithdrawFunds}
//                 style={{
//                   background: '#ff5577',
//                   color: '#fff',
//                   padding: '8px 15px',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                 }}
//               >
//                 Withdraw Funds
//               </button>
//             </div>
//           </div>
//         </div>
//       </Collapsible>
//       <div
//         style={{
//           fontFamily: 'Arial, sans-serif',
//           color: '#333',
//           background: '#f5f5f5',
//           padding: '10px',
//           borderRadius: '8px',
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
//         }}
//       >
//         {/* Employee Status */}
//         <div
//           style={{
//             marginTop: '20px',
//             background: '#1a1a1a',
//             padding: '10px',
//             borderRadius: '8px',
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
//           }}
//         >
//           <h2
//             style={{
//               borderBottom: '2px solid #ddd',
//               paddingBottom: '5px',
//               fontSize: '18px',
//               margin: '0 0 10px',
//               color: '#fff',
//             }}
//           >
//             Employee Status
//           </h2>
//           <p style={{ fontSize: '14px', color: '#b8e6ff' }}>
//             Complains: {complains}
//           </p>
//           <p style={{ fontSize: '14px', color: '#b8e6ff' }}>
//             Queries: {queries}
//           </p>
//           <p style={{ fontSize: '14px', color: '#b8e6ff' }}>
//             Requests: {requests}
//           </p>
//           <p style={{ fontSize: '14px', color: '#b8e6ff' }}>Todos:</p>
//           {/* <ul style={{ fontSize: '14px', color: '#b8e6ff', paddingLeft: '20px' }}>
//           {todos.map((todo, index) => (
//             <li key={index}>{todo}</li>
//           ))}
//         </ul> */}
//           <div
//             style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
//           >
//             <input
//               type="text"
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//               placeholder="Add Todo"
//               style={{ padding: '5px', fontSize: '14px', marginRight: '5px' }}
//             />
//             <Button
//               variant="outlined"
//               onClick={handleAddTodo}
//               style={{
//                 color: '#b8e6ff',
//                 borderColor: '#b8e6ff',
//                 fontSize: '14px',
//               }}
//             >
//               Add Todo
//             </Button>
//           </div>
//         </div>

//         {/* ... (existing code) */}

//         {/* Icon Grid */}
//         <div
//           style={{
//             marginTop: '20px',
//             background: '#1a1a1a',
//             padding: '10px',
//             borderRadius: '8px',
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
//           }}
//         >
//           <h2
//             style={{
//               borderBottom: '2px solid #ddd',
//               paddingBottom: '5px',
//               fontSize: '18px',
//               margin: '0 0 10px',
//               color: '#fff',
//             }}
//           >
//             Icons
//           </h2>
//           <Grid container spacing={2}>
//             <Grid item xs={4}>
//               <Button
//                 variant="outlined"
//                 startIcon={<PublishIcon />}
//                 style={{
//                   color: '#b8e6ff',
//                   borderColor: '#b8e6ff',
//                   fontSize: '14px',
//                 }}
//               >
//                 Upload
//               </Button>
//             </Grid>
//             <Grid item xs={4}>
//               <Button
//                 variant="outlined"
//                 startIcon={<InsertDriveFileIcon />}
//                 style={{
//                   color: '#b8e6ff',
//                   borderColor: '#b8e6ff',
//                   fontSize: '14px',
//                 }}
//               >
//                 Files
//               </Button>
//             </Grid>
//             <Grid item xs={4}>
//               <Button
//                 variant="outlined"
//                 startIcon={<CreateIcon />}
//                 style={{
//                   color: '#b8e6ff',
//                   borderColor: '#b8e6ff',
//                   fontSize: '14px',
//                 }}
//               >
//                 Write
//               </Button>
//             </Grid>
//             {/* Add more icons as needed */}
//           </Grid>
//         </div>
//       </div>
//       {/* Dialog for adding funds */}
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Add Funds</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Amount"
//             type="number"
//             value={fundsInput}
//             onChange={handleFundsInputChange}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>

//           <Button color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>
//       {/* Verification Dialog */}
//       <Dialog
//         open={confirmationOpen}
//         onClose={() => setConfirmationOpen(false)}
//       >
//         <DialogTitle>Confirm Loan Submission</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to submit the following loan details?
//             <br />
//             Loan Amount: {loan.loanAmount}
//             <br />
//             Minimum Repay: {loan.minimumRepay}
//             <br />
//             Repay Date: {repayDate}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelSubmit} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleLoanSubmit} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Ledger;
