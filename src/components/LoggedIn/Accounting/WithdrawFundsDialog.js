import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const WithdrawalFundDialog = ({ open, onClose, onConfirmWithdrawal }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleWithdrawAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
  };

  const handleConfirm = () => {
    // Perform withdrawal action and pass the withdrawAmount to the parent component
    onConfirmWithdrawal(withdrawAmount);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Withdraw Funds</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the amount you want to withdraw:
        </DialogContentText>
        <input
          type="number"
          value={withdrawAmount}
          onChange={handleWithdrawAmountChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawalFundDialog;
