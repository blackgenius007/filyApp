import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { selectEmployeesByDepartment } from '../../../Services/HR-Services/employeeSlice';

const RightSidebar = ({ isOpen, onClose, employeeCount, totalSalary,records }) => {
          // Department filtering selector function from employeeSlice
  const employees = useSelector((state) =>
  selectEmployeesByDepartment(state, records)
);
  const approvals = [
    { id: 1, title: 'Leave Request', approved: false },
    { id: 2, title: 'Expense Approval', approved: true },
    { id: 3, title: 'Project Proposal', approved: false },
  ];

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: 250, padding: '1rem' }}>
      <Typography variant="h6">{records} Records</Typography>
      <p>Number of Employees: {employees.length}</p>
        <p>Total Department Salary: {totalSalary}</p>

        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Approvals and Requests
        </Typography>

        <List>
          {approvals.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} />
              <Checkbox checked={item.approved} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default RightSidebar;









// import React from 'react';
// import Drawer from '@mui/material/Drawer';
// import Typography from '@mui/material/Typography';
// import { useSelector } from 'react-redux';
// import { selectEmployeesByDepartment } from '../../../Services/HR-Services/employeeSlice';

// const RightSidebar = ({ isOpen, onClose, employeeCount, totalSalary,records }) => {
//       // Department filtering selector function from employeeSlice
//   const employees = useSelector((state) =>
//   selectEmployeesByDepartment(state, records)
// );
//   return (
//     <Drawer anchor="right" open={isOpen} onClose={onClose}>
//       <div style={{ width: 250, padding: '1rem' }}>
//         <Typography variant="h6">{records} Records</Typography>
//         <p>Number of Employees: {employees.length}</p>
//         <p>Total Department Salary: {totalSalary}</p>
//         <p>Request/Approvals: New Safety boot required </p>
//       </div>
//     </Drawer>
//   );
// };

// export default RightSidebar;
