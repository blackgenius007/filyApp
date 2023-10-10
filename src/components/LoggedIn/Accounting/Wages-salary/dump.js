import React, { useState } from 'react';

function Ledger() {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [openingBalance, setOpeningBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);

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

  return (
    <div>
      <h2>Ledger</h2>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addEntry}>Add Entry</button>
        <button onClick={addBalance}>Add to Balance</button>
      </div>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <span>{entry.description}</span>
            <span>{entry.amount}</span>
          </li>
        ))}
      </ul>
      <div>
        <p>Opening Balance: {openingBalance}</p>
        <p>Closing Balance: {closingBalance}</p>
        <p>Total Cost of Entries: {entries.reduce((total, entry) => total + entry.amount, 0)}</p>
      </div>
    </div>
  );
}

export default Ledger;


==================================================================
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
      {/* Input fields and buttons remain the same */}
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
      {/* Balance information remains the same */}
    </div>
  </div>
</Collapsible>































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
  const [balance, setBalance] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [fundsAdded, setFundsAdded] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [isAddFundsDialogOpen, setAddFundsDialogOpen] = useState(false);
  const [isWithdrawFundsDialogOpen, setWithdrawFundsDialogOpen] = useState(false);




 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [complains, setComplains] = useState('Unpaid salary');
  const [queries, setQueries] = useState('Lateness to work 6/18/23');
  const [requests, setRequests] = useState('');
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [dialogOpenFund, setDialogOpenFund] = useState(false);
  const [dialogOpenDraw, setDialogOpenDraw] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [amount, setAmount] = useState({});
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
  const handleBalanceChange = (event) => {
    const newBalance = parseFloat(event.target.value);
    setBalance(newBalance);
  };

  const handleAddFunds = () => {
    setOpeningBalance(closingBalance);
    setFundsAdded(balance);
    setClosingBalance(closingBalance + balance);
    setAddFundsDialogOpen(false);
  };

  const handleWithdrawFunds = () => {
    setOpeningBalance(closingBalance);
    setWithdrawalAmount(balance);
    setClosingBalance(closingBalance - balance);
    setWithdrawFundsDialogOpen(false);
  };

  const handleOpenAddFundsDialog = () => {
    setAddFundsDialogOpen(true);
  };

  const handleCloseAddFundsDialog = () => {
    setAddFundsDialogOpen(false);
  };

  const handleOpenWithdrawFundsDialog = () => {
    setWithdrawFundsDialogOpen(true);
  };

  const handleCloseWithdrawFundsDialog = () => {
    setWithdrawFundsDialogOpen(false);
  };



  // Todo functions
  const handleAddTodo = () => {
    if (newTodo && newTodo.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodo(''); // Clear the input field after adding the todo
    }
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
          <h2
            style={{
              borderBottom: '2px solid #ddd',
              paddingBottom: '5px',
              fontSize: '18px',
              margin: '0 0 10px',
            }}
          >
            Employee Details
          </h2>
          <label
            htmlFor="balance"
            style={{ display: 'block', margin: '5px 0' }}
          >
            Balance:
          </label>
          {/* {balance} */}
          <input
              type="number"
          id="balance"
          value={balance}
          onChange={handleBalanceChange}
            style={{ padding: '5px', fontSize: '14px' }}
          />

          {/* Ledger Component */}
          <div
            style={{
              marginTop: '10px',
              background: '#333',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2
              style={{
                borderBottom: '2px solid #ddd',
                paddingBottom: '5px',
                fontSize: '18px',
                margin: '0 0 10px',
              }}
            >
              Ledger Component
            </h2>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              Opening Balance: ${openingBalance}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              Funds Added: ${fundsAdded}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              Withdrawal Amount: ${withdrawalAmount}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              Closing Balance: ${closingBalance}
            </p>
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={ handleOpenAddFundsDialog }
                style={{
                  background: '#00aaff',
                  color: '#fff',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '5px',        
                  fontSize: '14px',
                }}
              >
                Add Funds
              </button>
              <button
                onClick={ handleOpenWithdrawFundsDialog }
                style={{
                  background: '#ff5577',
                  color: '#fff',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
        
      {/* Dialog for adding funds */}
      <Dialog open={isAddFundsDialogOpen} onClose={handleCloseAddFundsDialog}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={fundsAdded}
            onChange={(event) => setFundsAdded(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFundsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFunds} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

     {/* Dialog for adding funds */}
     <Dialog open={isAddFundsDialogOpen} onClose={handleCloseAddFundsDialog}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFundsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFunds} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for withdrawing funds */}
      <Dialog
        open={isWithdrawFundsDialogOpen}
        onClose={handleCloseWithdrawFundsDialog}
      >
        <DialogTitle>Withdraw Funds</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawFundsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWithdrawFunds} color="primary">
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
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
            Employee Status
          </h2>
          <p style={{ fontSize: '14px', color: '#b8e6ff' }}>
            Complains: {complains}
          </p>
          <p style={{ fontSize: '14px', color: '#b8e6ff' }}>
            Queries: {queries}
          </p>
          <p style={{ fontSize: '14px', color: '#b8e6ff' }}>
            Requests: {requests}
          </p>
          <p style={{ fontSize: '14px', color: '#b8e6ff' }}>Todos:</p>
          {/* <ul style={{ fontSize: '14px', color: '#b8e6ff', paddingLeft: '20px' }}>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul> */}
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add Todo"
              style={{ padding: '5px', fontSize: '14px', marginRight: '5px' }}
            />
            <Button
              variant="outlined"
              onClick={handleAddTodo}
              style={{
                color: '#b8e6ff',
                borderColor: '#b8e6ff',
                fontSize: '14px',
              }}
            >
              Add Todo
            </Button>
          </div>
        </div>

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
            Icons
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                variant="outlined"
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
    </>
  );
};

export default Ledger;


































import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'; // Import necessary components from Material UI

const LedgerComponent = () => {
  const [balance, setBalance] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [fundsAdded, setFundsAdded] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [isAddFundsDialogOpen, setAddFundsDialogOpen] = useState(false);
  const [isWithdrawFundsDialogOpen, setWithdrawFundsDialogOpen] = useState(false); // Petty cash functionality section

  const handleBalanceChange = (event) => {
    const newBalance = parseFloat(event.target.value);
    setBalance(newBalance);
  };

  const handleAddFunds = () => {
    setOpeningBalance(balance);
    setFundsAdded(fundsAdded + balance);
    setClosingBalance(openingBalance + fundsAdded + balance);
    setAddFundsDialogOpen(false);
  };

  const handleWithdrawFunds = () => {
    setOpeningBalance(closingBalance);
    setWithdrawalAmount(balance);
    setClosingBalance(closingBalance - balance);
    setWithdrawFundsDialogOpen(false);
  };

  const handleOpenAddFundsDialog = () => {
    setAddFundsDialogOpen(true);
  };

  const handleCloseAddFundsDialog = () => {
    setAddFundsDialogOpen(false);
  };

  const handleOpenWithdrawFundsDialog = () => {
    setWithdrawFundsDialogOpen(true);
  };

  const handleCloseWithdrawFundsDialog = () => {
    setWithdrawFundsDialogOpen(false);
  };

  return (
    <Collapsible
      trigger={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
        >
          Petty Cash
        </Button>
      }
    >
      <div className="ledger-container">
        <h2>Employee Details</h2>
        <label htmlFor="balance">Balance:</label>
        <input
          type="number"
          id="balance"
          value={balance}
          onChange={handleBalanceChange}
          className="input-field"
        />

        {/* Ledger Component */}
        <div className="ledger">
          <h2>Ledger Component</h2>
          <p>Opening Balance: ${openingBalance}</p>
          <p>Funds Added: ${fundsAdded}</p>
          <p>Withdrawal Amount: ${withdrawalAmount}</p>
          <p>Closing Balance: ${closingBalance}</p>
          <div className="ledger-buttons">
            <button
              onClick={handleOpenAddFundsDialog}
              className="add-funds-button"
            >
              Add Funds
            </button>
            <button
              onClick={handleOpenWithdrawFundsDialog}
              className="withdraw-funds-button"
            >
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>

      {/* Dialog for adding funds */}
      <Dialog
        open={isAddFundsDialogOpen}
        onClose={handleCloseAddFundsDialog}
      >
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={fundsAdded}
            onChange={(event) => setFundsAdded(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFundsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFunds} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for withdrawing funds */}
      <Dialog
        open={isWithdrawFundsDialogOpen}
        onClose={handleCloseWithdrawFundsDialog}
      >
        <DialogTitle>Withdraw Funds</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={withdrawalAmount}
            onChange={(event) => setWithdrawalAmount(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawFundsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWithdrawFunds} color="primary">
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
    </Collapsible>
  );
};

export default LedgerComponent;
























//       {/* Dialog for adding funds */}
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Add Funds</DialogTitle>
//         <DialogContent>
//           <TextField
//             type="number"
//             id="balance"
//             value={balance}
//             onChange={handleBalanceChange}
           
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>

//           <Button color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>

//    {/* Dialog for withdrawing funds */}
//       <Dialog open={dialogOpenW} onClose={handleDialogCloseW}>
//         <DialogTitle>Withdrawal</DialogTitle>
//         <DialogContent>
//           <TextField
//             type="number"
//             id="balance"
//             value={balance}
//             onChange={handleBalanceChange}
           
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>

//           <Button color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>




// const Ledger = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [balance, setBalance] = useState(0);
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [fundsAdded, setFundsAdded] = useState(0);
//   const [withdrawalAmount, setWithdrawalAmount] = useState(0);
//   const [closingBalance, setClosingBalance] = useState(0);
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
//   const [message, setMessage]=useState('')
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

//   const handleBalanceChange = (event) => {
//     const newBalance = parseFloat(event.target.value);
//     setBalance(newBalance);
//   };

//   const handleAddFunds = () => {
//     setOpeningBalance(balance);
//     setFundsAdded(fundsAdded + balance);
//     setClosingBalance(openingBalance + fundsAdded + balance);
//   };

//   const handleWithdrawFunds = () => {
//     setOpeningBalance(closingBalance);
//     setWithdrawalAmount(balance);
//     setClosingBalance(closingBalance - balance);
//   };


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


//   // handle submit loan
//   const handleLoanSubmit = async (e) => {
//     e.preventDefault();

//     const { loanAmount, minimumRepay, repayDate } = loan;
//     const loanDetail = {
//       loanAmount,
//       minimumRepay,
//       id,
//       repayDate,
//     };
  
//     try {
//       const response = await dispatch(addLoan({  loanDetail  }));
//       console.log('response=>', response);
//       if (response.meta.requestStatus === 'fulfilled') {
//         setMessage('Successfully submitted, disbursement can be initiated!');
//       } else {
//         throw new Error('Adding loan failed: Response was not successful');
//       }
//     } catch (error) {
//       console.error('Error adding loan:', error); // Log the detailed error
//       setMessage(`An error occurred: ${error.message}`);
//     }
//   };
  



//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false); // Close the dialog if cancel is clicked
//   };

//   // Handle the input for adding funds
//   // const handleAddFunds = () => {
//   //   setDialogOpen(true);
//   // };

//   // const handleDialogClose = () => {
//   //   setDialogOpen(false);
//   // };

//   // const handleFundsInputChange = (event) => {
//   //   setFundsInput(event.target.value);
//   // };

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

//   const handleExemption = async () => {
//     const { loanAmount, minimumRepay,repayDate } = loan;
    
//     // Parse the current repayDate using Moment
//     const currentRepayDate = moment(repayDate);
    
//     // Add one month to the current repayDate
//     const adjustedRepayDate = currentRepayDate.add(1, 'months');
    
//     // Format the adjustedRepayDate as a string in the desired format
//     const adjustedRepayDateFormatted = adjustedRepayDate.format('YYYY-MM-DD');
    
//     const exemptBy = loanAmount / minimumRepay + 1;
//     const ExemptBy = moment().add(exemptBy, 'months').calendar();
  
//     const loanDetail = {
//       id,
//       ExemptBy,
//       repayDate: adjustedRepayDateFormatted, // Include the adjusted repayDate
//     };
//   console.log('exempted=>',loanDetail)   
//     try {
//       const response = await dispatch(updateLoan({ loanDetail }));
//       console.log('response=>', response);
//       if (response.meta.requestStatus === 'fulfilled') {
//         setMessage('The loan expiry date has been successfully adjusted forward by one month.');
    
//       } else {
//         throw new Error('Adding loan failed: Response was not successful');
//       }
//     } catch (error) {
//       console.error('Error adding loan:', error); // Log the detailed error
//       setMessage(`An error occurred: ${error.message}`);
//     }
//   };
  

//   const handleLoanPayoff= async (id,loan) => {
//     const today = moment();
  
//     const loanDetail = {
//       id,
//       today
//     };
       
 
//     try {
//       const response = await dispatch(loanPayOff({ loanDetail }));
//       console.log('response=>', response);
//       if (response.meta.requestStatus === 'fulfilled') {
//         setMessage('Successfully paid off remaining loan!');
//       } else {
//         throw new Error('Pay Off failed: Response was not successful');
//       }
//     } catch (error) {
//       console.error('Error adding loan:', error); // Log the detailed error
//       setMessage(`An error occurred: ${error.message}`);
//     }
//   };
  
 
 
//     // convert currency
//     const toMoney = (value) => {
//       return accounting.formatMoney(accounting.unformat(value), {
//         symbol: '',
//         precision: 2,
//       });
//     };
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
//       <span>{message}</span>
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
//       <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
//   <DialogTitle>Are you sure you want to submit the following loan details?</DialogTitle>
//   <DialogContent>
//     <DialogContentText>
//       <div style={{ marginBottom: '10px', fontSize: '14px' }}>
//         Loan Amount: <strong>{toMoney(loan.loanAmount)}</strong>
//       </div>
//       <div style={{ marginBottom: '10px', fontSize: '14px' }}>
//         Minimum Repay: <strong>{toMoney(loan.minimumRepay)}</strong>
//       </div>
//       <div style={{ marginBottom: '10px', fontSize: '14px' }}>
//         Repay Date: <strong>{repayDate}</strong>
//       </div>
//       {message && (
//         <div style={{ marginTop: '20px', color: '#E97451', fontSize: '14px' }}>
//           {message}
//         </div>
//       )}
//     </DialogContentText>
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleCancelSubmit} color="primary">
//       Cancel
//     </Button>
//     <Button onClick={handleLoanSubmit} color="primary">
//       Confirm
//     </Button>
//   </DialogActions>
// </Dialog>

//     </>
//   );
// };

// export default Ledger;


 
   
 