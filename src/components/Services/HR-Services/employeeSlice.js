import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeService from './employeeServices';
import { createSelector } from 'reselect';

const initialState = {
  employees: [],
  attendance: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register employee
export const registerEmployee = createAsyncThunk(
  'employees/register',
  async ({ employeeData, employeeId }, thunkAPI) => {
    try {
      return await employeeService.register(employeeData, employeeId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Retrieve all employees
export const retrieveAllEmployees = createAsyncThunk(
  'employees/retrieveAll',
  async (userEmail, thunkAPI) => {
    try {
      return await employeeService.retrieveEmployees(userEmail);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Retrieve employee designations
export const fetchDesignations = createAsyncThunk(
  'employees/fetchDesignations',
  async ({ email, projectname }, thunkAPI) => {
    try {
      return await employeeService.retrieveDesignations(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Retrieve a single employee by ID
export const retrieveEmployeeById = createAsyncThunk(
  'employees/retrieveById',
  async (employeeId, thunkAPI) => {
    try {
      return await employeeService.retrieveEmployee(employeeId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a single employee
export const updateEmployeeById = createAsyncThunk(
  'employees/updateById',
  async ({ employeeId, formData }, thunkAPI) => {
    try {
      return await employeeService.updateEmployee(employeeId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a single employee
export const deleteEmployeeById = createAsyncThunk(
  'employees/deleteById',
  async (employeeId, thunkAPI) => {
    try {
      await employeeService.deleteEmployee(employeeId);
      return employeeId;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Save payroll data for an employee
export const savePayrollData = createAsyncThunk(
  'employees/savePayroll',
  async ({ requestPayload }, thunkAPI) => {
    try {
      return await employeeService.savePayrollData(requestPayload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Complain status
export const complainStatus = createAsyncThunk(
  'employees/complainStatus',
  async ({ date, employeeId, complainDetail, dueDate, label }, thunkAPI) => {
    try {
      const response = await employeeService.complainStatus({
        date,
        employeeId,
        complainDetail,
        dueDate,
        label,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Mark today for a single employee
export const markTodayEmployee = createAsyncThunk(
  'employees/markTodayEmployee',
  async ({ date, employeeId, label }, thunkAPI) => {
    try {
      const response = await employeeService.markTodayEmployee(
        date,
        employeeId,
        label
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Mark today for all employees
export const markTodayAllEmployees = createAsyncThunk(
  'employees/markTodayAllEmployees',
  async ({ userEmail, label, date }, thunkAPI) => {
    try {
      const response = await employeeService.markTodayAllEmployees(
        userEmail,
        label,
        date
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateComplain = createAsyncThunk(
  'employees/updateComplain',
  async (date, thunkAPI) => {
    try {
      const response = await employeeService.updateComplain(date);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Selector to get employees by department
export const selectEmployeesByDepartment = createSelector(
  (state, department) => state.employees.employees,
  (state, department) => department,
  (employees, unit) => {
    return employees.filter((employee) => employee.department === unit);
  }
);

export const retrieveAllAttendance = createAsyncThunk(
  'employees/retrieveAllAttendance',
  async ({ userEmail, dateOffset }, thunkAPI) => {
    try {
      const response = await employeeService.retrieveAllAttendance(
        userEmail,
        dateOffset
      );
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;         
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Assuming the response contains the registered employee data
        state.employees.push(action.payload);
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(retrieveAllEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(retrieveAllEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(retrieveEmployeeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveEmployeeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const retrievedEmployee = action.payload;
        const employeeIndex = state.employees.findIndex(
          (employee) => employee.id === retrievedEmployee.id
        );
        if (employeeIndex !== -1) {
          // If the employee already exists, update their details
          state.employees[employeeIndex] = retrievedEmployee;
        } else {
          // If the employee doesn't exist, add them to the list
          state.employees.push(retrievedEmployee);
        }
      })
      .addCase(retrieveEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEmployeeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployeeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedEmployee = action.payload;
        const employeeIndex = state.employees.findIndex(
          (employee) => employee.id === updatedEmployee.id
        );
        if (employeeIndex !== -1) {
          // Update the employee details
          state.employees[employeeIndex] = updatedEmployee;
        }
      })
      .addCase(updateEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEmployeeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedEmployeeId = action.payload;
        state.employees = state.employees.filter(
          (employee) => employee.id !== deletedEmployeeId
        );
      })
      .addCase(deleteEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(savePayrollData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePayrollData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Assuming the response contains the saved payroll data
        const { employeeId, payrollData } = action.payload;
        const employeeIndex = state.employees.findIndex(
          (employee) => employee.id === employeeId
        );
        if (employeeIndex !== -1) {
          // If the employee already exists, update their payroll data
          state.employees[employeeIndex].payrollData = payrollData;
        } else {
          // If the employee doesn't exist, add them to the list with payroll data
          state.employees.push({
            id: employeeId,
            payrollData: payrollData,
          });
        }
      })
      .addCase(savePayrollData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchDesignations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const data = action.payload;

        const options = data.map((d) => ({
          value: d._id,
          label: d.designation,
        }));

        state.designations = options; // Assuming you have a designations array in the state
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(complainStatus.fulfilled, (state, action) => {
        // Handle fulfilled action
      })
      .addCase(complainStatus.rejected, (state, action) => {
        // Handle rejected action
      })
      .addCase(markTodayEmployee.fulfilled, (state, action) => {
        // Handle fulfilled action
      })
      .addCase(markTodayEmployee.rejected, (state, action) => {
        // Handle rejected action
      })
      .addCase(markTodayAllEmployees.fulfilled, (state, action) => {
        // Handle fulfilled action
      })
      .addCase(markTodayAllEmployees.rejected, (state, action) => {
        // Handle rejected action
      })
      .addCase(updateComplain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplain.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // You can update any relevant state here if needed
      })
      .addCase(updateComplain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(retrieveAllAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAllAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.attendance = action.payload;
      })
      .addCase(retrieveAllAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
