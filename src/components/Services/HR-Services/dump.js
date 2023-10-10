const data = [
  {'ItemName': 'Basket','cartegory':'Groceries','quantity':6}
]







.addCase(retrieveEmployeeDetail.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(retrieveEmployeeDetail.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    const retrievedDetail = action.payload;
    const employeeIndex = state.employees.findIndex(
      (employee) => employee.id === retrievedDetail.id
    );
    if (employeeIndex !== -1) {
      // If the employee detail already exists, update their details
      state.employees[employeeIndex] = retrievedDetail;
    } else {
      // If the employee detail doesn't exist, add them to the list
      state.employees.push(retrievedDetail);
    }
  })
  .addCase(retrieveEmployeeDetail.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  })