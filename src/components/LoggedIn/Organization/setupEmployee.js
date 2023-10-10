import React from 'react';
import './Organisation.css';
import Department from './department';
import PayrollSettings from './Payroll/payrollSettings';

const SetupEmployee = () => {
  return (
    <div className="two-column-container">
      <div className="column">
       <PayrollSettings/> 
             </div>
      <div className="vertical-line"></div>
      <div className="column">
        <Department/>
      </div>
    </div>
  );
};

export default SetupEmployee;
