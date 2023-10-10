import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { Button as SemanticButton, Icon } from 'semantic-ui-react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from 'react-bootstrap';
import {
  retrieveAllEmployees,
  updateComplain,
  complainStatus,
  markTodayEmployee,
  markTodayAllEmployees,
} from '../../../Services/HR-Services/employeeSlice';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContentText,
} from '@mui/material';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import moment from 'moment';
// import Button from '../common/Button';
// import TextBox from '../common/TextBox';
import styled from 'styled-components';

const Styles = styled.div`
  .main-container {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* overflow: scroll; */
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  .form {
    display: flex;
    width: 80%;
    /* flex: 1; */
    flex-direction: column;
    justify-content: space-around;
    margin-top: 8px;
    padding: 8px;
    border: 1px solid lightgray;
    box-shadow: 0px 5px 5px -3px gray;
  }
  .date-picker-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  table {
    background-color: white;
    width: 100%;
    border-spacing: 4px;
    border: 1px solid lightgray;
    box-shadow: 0px 5px 5px -2px gray;
    padding: 8px 0 8px 0;
    margin: 8px 0 8px 0;
  }
  td,
  th {
    text-align: center;
    border-radius: 3px;
  }
  th {
    background-color: #008080;
    border-color: #444;
    /* outline: 2px solid #444; */
    color: #fafafa;
    padding: 4px 0 4px 0;
    /* box-shadow: 0px 5px 5px -2px gray;  */
    /* box-shadow: 0 0 8px 0 #444; */
    /* border: 4px solid #444; */
  }

  tr {
    border-bottom: 1px solid lightgray;
  }

  .table-controls {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    margin-top: 4px;
  }
  .table-legends {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
  }
  .legends {
    padding: 4px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 3px;
  }
  .legends-inline {
    display: inline-block;
    padding: 4px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 3px;
  }
  .table-pagination {
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .pagination-buttons {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
  .results {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    margin-left: 900px
  }
  @media only screen and (min-width: 600px) {
    .container {
      padding: 4px 8px 4px 8px;
    }
    .content {
      padding: 8px 8px 8px 8px;
      align-self: stretch;
    }
    .heading {
      font-size: 32px;
    }
    .form {
      width: 60%;
    }
  }

  @media only screen and (min-width: 430px) {
    .content {
      padding: 8px 8px 8px 8px;
      align-self: stretch;
    }
  }
  @media only screen and (max-width: 600px) {
    .attendance-table tr > :nth-child(3),
    .attendance-table tr > :nth-child(4),
    .attendance-table tr > :nth-child(5),
    .attendance-table tr > :nth-child(6),
    .attendance-table tr > :nth-child(7) {
      display: none;
    }
    .content {
      font-size: 14px;
    }
  }
  .attendance-table tr > :nth-child(3),
  .attendance-table tr > :nth-child(4),
  .attendance-table tr > :nth-child(5),
  .attendance-table tr > :nth-child(6),
  .attendance-table tr > :nth-child(7),
  .attendance-table tr > :nth-child(8),
  .attendance-table tr > :nth-child(9) {
    min-width: 2.9em;
    width: 2.9em;
    max-width: 2.9em;
  }
  @media only screen and (max-width: 1150px) {
    .attendance-table tr > :nth-child(10) {
      min-width: 5em;
      width: 5em;
      max-width: 5em;
    }
  }
  tr:nth-child(even) {
    background-color: lightgray;
  }
  tr:nth-child(odd) {
    background-color: beige;
  }
  td.date-column.highlighted-date {
    background-color: yellow; /* or any color you prefer */
    font-weight: bold;
  }

  td.status-cell {
    /* Define status-specific styles here */
    &.status-present {
      background-color: green;
      color: white;
    }

    &.status-absent {
      background-color: red;
      color: white;
    }

    &.status-on-leave {
      background-color: orange;
      color: white;
    }

 

`;

function Attendance() {
  const dispatch = useDispatch();
  let { projectname } = useParams();
  const colorClasses = {
    Vacation: '#3498db', // Blue
    Present: '#2ecc71', // Green
    Sick: '#f39c12', // Yellow
    Suspension: '#7f8c8d', // Gray
    Absent: '#e74c3c', // Red
  };

  const [employeeNameFilter, setEmployeeNameFilter] = useState('');
  const [indexi, setIndex] = useState(0);
  const [labeli, setLabel] = useState('');
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [shownCount, setShownCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [dateOffset, setDateOffset] = useState(0);
  const [searched, setSearched] = useState('');
  const [today, setToday] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [rfq, setRfq] = useState({
    dueDate: '',
    complainDetail: '',
  });

  // const { user } = useSelector((state) => state.auth);
  const { role, email, ownerEmail } = useSelector(
    (state) => state.auth.user.data
  );
  const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
  console.log(userEmail);

  // All employee redux state
  const { employees } = useSelector((state) => state.employees);

  // retrieve all employee from API
  useEffect(() => {
    // Dispatch retrieveAllEmployee action
    dispatch(retrieveAllEmployees(userEmail));
  }, [dispatch, userEmail]);

  useEffect(() => {
    var date = today;
    dispatch(updateComplain(date));

    // var date = '2022-09-06'
  }, [dispatch, today]);

  const onFilterChange = (event) => {
    var newFilter = event.target.value.toLowerCase();
    setEmployeeNameFilter(newFilter);
    setCurrentPage(1);
  };

  const decreasePage = () => {
    // currentPage--;
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const increasePage = () => {
    if (currentPage <= totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const addDateOffset = (value) => {
    setDateOffset(dateOffset + value);
  };

  const handleDatePickerChange = (date) => {
    var newDate = moment(date).format('dd mmm yyyy');
    var oldDate = moment(today).format('dd mmm yyyy');
    var diffInDays = moment(newDate).diff(moment(oldDate), 'days');
    setDateOffset(diffInDays);
  };

  // Opens dialog for suspension details
  const handleClickOpen = (index, label) => {
    // identification stored temporarily in component state
    setOpen(true);
    setIndex(index);
    setLabel(label);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRfq((rfq) => ({ ...rfq, [name]: value }));
  };

  const complain = (index, label) => {
    const { complainDetail, dueDate } = rfq;
    console.log('Complain-Details=>', complainDetail, dueDate);
    const employeeId = employees[index]._id;
    const date = today;
    dispatch(complainStatus({ date, employeeId, complainDetail, dueDate }));
  };
  // Action to mark a single employee
  const markEmployee = (index, label) => {
    alert(label);
    const employeeId = employees[index]._id;
    const date = today;
    console.log(date, employeeId, label);
    dispatch(markTodayEmployee({ date, employeeId, label }));
    alert('submitted successfully!');
  };
  // Action to mark all employee
  const markAllEmployees = (label) => {
    const date = today;
    dispatch(markTodayAllEmployees({ date, userEmail, label }));
    alert('submitted successfully!');
  };

  // re-direct to calling page
  // const goBack = (d) => {
  // if (page === '4') {
  //   history.push(`/employer/employee/${projectname}`);
  // } else {
  //   history.push(`/employer/employee-panel/${projectname}`);
  // }
  // };

  const renderTable = () => {
    var totalCount = 0;
    var shownCount = 0;
    var lowerBound = 0;
    var upperBound = 0;
    var filtered = [];

    filtered = employees.map((row, i) => {
      if (row.employeeName.toLowerCase().indexOf(employeeNameFilter) > -1) {
        var attd = row.attendances || {};
        var dates = [];
        dates.push(
          moment(today)
            .subtract(6 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        dates.push(
          moment(today)
            .subtract(5 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        dates.push(
          moment(today)
            .subtract(4 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        dates.push(
          moment(today)
            .subtract(3 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        dates.push(
          moment(today)
            .subtract(2 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        dates.push(
          moment(today)
            .subtract(1 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        dates.push(
          moment(today)
            .subtract(0 - dateOffset, 'days')
            .format('YYYY-MM-DD')
        );
        return (
          <tr key={'employeeData' + i}>
            <td>{i + 1}</td>
            <td>
              <Link
                to={`/employer/detail/${row._id}/${projectname}`}
                style={{ textDecoration: 'none', color: '#71797E' }}
              >
                {' '}
                {row.employeeName}
              </Link>{' '}
            </td>
            <td
              style={{
                backgroundColor:
                  attd[dates[0]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[0]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[0]] === 'Sick'
                    ? 'yellow'
                    : attd[dates[0]] === 'Suspension'
                    ? 'gray'
                    : '#FA8072',
              }}
            ></td>
            <td
              style={{
                backgroundColor:
                  attd[dates[1]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[1]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[1]] === 'Sick'
                    ? 'yellow'
                    : '#FA8072',
              }}
            ></td>
            <td
              style={{
                backgroundColor:
                  attd[dates[2]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[2]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[2]] === 'Sick'
                    ? 'yellow'
                    : attd[dates[2]] === 'Suspension'
                    ? 'gray'
                    : '#FA8072',
              }}
            ></td>
            <td
              style={{
                backgroundColor:
                  attd[dates[3]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[3]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[3]] === 'Sick'
                    ? 'yellow'
                    : attd[dates[3]] === 'Suspension'
                    ? 'gray'
                    : '#FA8072',
              }}
            ></td>
            <td
              style={{
                backgroundColor:
                  attd[dates[4]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[4]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[4]] === 'Sick'
                    ? 'yellow'
                    : attd[dates[4]] === 'Suspension'
                    ? 'gray'
                    : '#FA8072',
              }}
            ></td>
            <td
              style={{
                backgroundColor:
                  attd[dates[5]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[5]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[5]] === 'Sick'
                    ? 'yellow'
                    : attd[dates[5]] === 'Suspension'
                    ? 'gray'
                    : '#FA8072',
              }}
            ></td>
            <td
              style={{
                backgroundColor:
                  attd[dates[6]] === 'Vacation'
                    ? '#008ECC'
                    : attd[dates[6]] === 'Present'
                    ? '#7CFC00'
                    : attd[dates[6]] === 'Suspension'
                    ? 'gray'
                    : attd[dates[6]] === 'Sick'
                    ? 'yellow'
                    : '#FA8072',
              }}
            ></td>
            <td>
              <Button
                onClick={() => markEmployee(i, 'Present')}
                className="btn btn-success"
                title="Present"
              >
                {' '}
                P
              </Button>
              <Button
                onClick={() => markEmployee(i, 'Sick')}
                className="btn btn-warning"
                title="Sick"
              >
                {' '}
                S
              </Button>

              <Button
                onClick={() => handleClickOpen(i, 'Suspension')}
                className="btn bg-secondary"
                title="Suspension"
              >
                {' '}
                X
              </Button>
              <Button
                onClick={() => markEmployee(i, 'Vacation')}
                className="btn btn-info"
                title="Vacation"
              >
                {' '}
                V
              </Button>
              <Button
                onClick={() => markEmployee(i, 'Absent')}
                className="btn btn-danger"
                title="Absent"
              >
                {' '}
                A
              </Button>
            </td>
          </tr>
        );
      } else {
        return undefined;
      }
    });
    var filteredTotalPage = totalPage;
    var filteredCurrentPage = currentPage;
    filtered = filtered.filter((row) => row !== undefined);
    totalCount = filtered.length;
    if (filtered.length > 0) {
      if (filtered.length > limitPage) {
        lowerBound = (currentPage - 1) * limitPage;
        upperBound = currentPage * limitPage;
        // console.log("getting from index", lowerBound, "to", lowerBound+this.state.limitPage);
        filtered = filtered.slice(lowerBound, upperBound);
      }
      filteredTotalPage = Math.ceil(totalCount / limitPage);
      shownCount = filtered.length;
      // return filtered;
    } else {
      filteredTotalPage = 1;
      filteredCurrentPage = 1;
      filtered = (
        <tr>
          <td colSpan="6">
            <em>No employee found</em>
          </td>
        </tr>
      );
    }

    if (currentPage > filteredTotalPage)
      filteredCurrentPage = filteredTotalPage;

    var buttonIncrease = (
      <Button className="btn" onClick={() => increasePage()}>
        &gt;
      </Button>
    );
    var buttonDecrease = (
      <Button className="btn" onClick={() => decreasePage()}>
        &lt;
      </Button>
    );

    if (!loading)
      return (
        <Styles>
          <div className="container">
            <div className="table-pagination">
              <div className="results">
                Showing {lowerBound + 1}-
                {shownCount ? lowerBound + shownCount : 1} result from{' '}
                {totalCount} total results
              </div>
              <div className="pagination-buttons">
                {currentPage > 1 ? buttonDecrease : ''}
                Page {filteredCurrentPage || currentPage} of{' '}
                {filteredTotalPage || totalPage}
                {currentPage < filteredTotalPage ? buttonIncrease : ''}
              </div>
            </div>

            <div className="table-controls justify-center align-stretch">
              <div>
                <Button title="Go back 1 day" onClick={() => addDateOffset(-1)}>
                  Go back 1 day
                </Button>
              </div>

              <div>
                <Button
                  title="Go forward 1 day"
                  onClick={() => addDateOffset(1)}
                >
                  Go forward 1 day
                </Button>
              </div>
            </div>

            <table className="attendance-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>
                    {moment(today)
                      .subtract(6 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>
                    {moment(today)
                      .subtract(5 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>
                    {moment(today)
                      .subtract(4 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>
                    {moment(today)
                      .subtract(3 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>
                    {moment(today)
                      .subtract(2 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>
                    {moment(today)
                      .subtract(1 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>
                    {moment(today)
                      .subtract(0 - dateOffset, 'days')
                      .format('ddd, Do MMM')}
                  </th>
                  <th>Mark today as</th>
                </tr>
              </thead>
              <tbody>{filtered}</tbody>
            </table>

            <div className="table-control">
              <div className="table-legends">
                Legends:
                <div
                  style={{
                    backgroundColor: '#7CFC00',
                    color: 'black',
                    margin: '2px',
                  }}
                >
                  Present
                </div>
                <div
                  style={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    margin: '2px',
                  }}
                >
                  Sick
                </div>
                <div
                  style={{
                    backgroundColor: 'gray',
                    color: 'black',
                    margin: '2px',
                  }}
                >
                  Suspension
                </div>
                <div
                  style={{
                    backgroundColor: '#008ECC',
                    color: 'black',
                    margin: '2px',
                  }}
                >
                  Vacation
                </div>
                <div
                  style={{
                    backgroundColor: '#FA8072',
                    color: 'black',
                    margin: '2px',
                  }}
                >
                  Absent
                </div>
              </div>
            </div>
          </div>
        </Styles>
      );
  };

  return (
    <>
      <h2>Employee Attendance Register</h2>
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem', // Add some margin at the bottom for spacing
        }}
      >
        {/* <Button className="btn btn-info" onClick={goBack}>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-left" width="17" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <polyline points="11 7 6 12 11 17" />
      <polyline points="17 7 12 12 17 17" />
    </svg>
  </Button> */}

        <TextField
          placeholder="Filter by name..."
          onChange={onFilterChange}
          value={employeeNameFilter}
          variant="outlined"
          size="small"
        />
        <div style={{ marginLeft: '90px' }}>
          <Button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure to mark all employees as `Present` for today?'
                )
              )
                markAllEmployees('Present');
            }}
            color="primary"
          >
            All present today
          </Button>

          <Button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure to mark all employees as `Absent` for today?'
                )
              )
                markAllEmployees('Absent');
            }}
            color="primary"
          >
            All absent today
          </Button>
        </div>
      </div>

      {/* Table */}
      {renderTable()}

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Suspension details</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter date to lift suspension</DialogContentText>
            <div style={{ marginLeft: '90px' }}>
              <br />
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <input
                  // onChange={handleChange}
                  id="datetime-local"
                  name="dueDate"
                  label="Lift suspension on"
                  type="date"
                  value={rfq.due}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MuiPickersUtilsProvider> */}

              <TextField
                id="outlined-multiline-static"
                label="Enter reason for suspension here..."
                multiline
                fullWidth
                rows={4}
                name="complainDetail"
                value={rfq.complainDetail}
                onChange={handleChange}
                // variant="contained"
              />

              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={complain} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Attendance;
