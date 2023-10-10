import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/Services/AuthServices/authSlice';
import employeeReducer from './components/Services/HR-Services/employeeSlice';
import financialReducer from './components/Services/AccountServices/financialSlice';
// import dialogReducer from './components/Dialog/dialogSlice';
export const store = configureStore({
    reducer: {
    auth: authReducer,
    employees:employeeReducer,
    financial: financialReducer,
    // dialog: dialogReducer,
  },
});

