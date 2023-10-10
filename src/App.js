import React, { useState } from 'react';
import Header from './components/LoggedOut/Nav/header';
import Home from './components/LoggedOut/Home/home';
import authService from './components/Services/AuthServices/authService';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { reset } from './components/Services/AuthServices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './components/LoggedIn/Dashboard/dashboard';
import Welcome from './components/LoggedOut/Home/Welcome/welcome';
import Users from './components/LoggedIn/Users/users';
import HumanResource from './components/LoggedIn/Organization/hr-panel';
import SetupEmployee from './components/LoggedIn/Organization/setupEmployee';
import ViewEmployee from './components/LoggedIn/HR/Employee/viewEmployee';
import NewEmployeeForm from './components/LoggedIn/HR/Employee/newEmployeeForm';
import EmployeeDetail from './components/LoggedIn/HR/Employee/EmployeeDetail/employee';
import Department from './components/LoggedIn/HR/Department/departmentView';
import Attendance from './components/LoggedIn/HR/Attendance/attendance';
import Accounts from './components/LoggedIn/Organization/acct-panel';
import WagesSalary from './components/LoggedIn/Accounting/Wages-salary/wagesCalculator';
import Salary from './components/LoggedIn/Accounting/Wages-salary/salaryCalculator';
import Inventory from './components/LoggedIn/Procurement/Inventory/inventory-records';
import InventorySheet from './components/LoggedIn/Procurement/Inventory/inventorySheet';
import './App.css';   
import Sidebar from './components/LoggedOut/sideBar';

function App() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [browseOpen, setBrowseOpen] = useState(false);

  const handleLogout = () => {
    authService.logout(navigate);
    dispatch(reset());
    //Refresh the window after logout   
    window.location.reload();
  };

  const toggleDrawer = (open) => () => {
    setBrowseOpen(open);
  };

  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  return (
    <div className="App">
      <Header />

      {user && !isHomeRoute && (
        <Sidebar
          handleLogout={handleLogout}
          isOpen={browseOpen}
          toggleDrawer={toggleDrawer}
        />
      )}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="/hr" element={<HumanResource />} />
          <Route path="/setup" element={<SetupEmployee />} />
          <Route path="/employee" element={<ViewEmployee />} />
          <Route path="/create-new" element={<NewEmployeeForm  />} />
          <Route path="/employee-detail/:id" element={<EmployeeDetail  />} />
          <Route path="/department-view/:department" element={<Department/>} />
          <Route path="/attendance" element={<Attendance/>} />
          <Route path="/accounts" element={<Accounts/>} />
          <Route path="/wages-salary" element={<WagesSalary/>} />
          <Route path="/salary" element={<Salary/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/inventory-sheet" element={<InventorySheet/>} />
        </Routes>    
      </div>   
      <div className="footer">
        <div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;

