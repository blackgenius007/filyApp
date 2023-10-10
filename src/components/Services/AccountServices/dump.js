import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state for financial data
const initialState = {
  consolidatedSalary: 0,
  annualTaxPayable: 0,
  monthlyTaxPayable: 0,
  // ... other financial data
};

// Helper functions for calculations
const getConsolidatedSalary = (income,location) => {
  let basicSalaryPercentage = 0;
  let housingAllowancePercentage = 0;
  let transportAllowancePercentage = 0;

  // Modify the percentages based on the country
  if (location === 'Nigeria') {

    basicSalaryPercentage = 0.4;
    housingAllowancePercentage = 0.3;
    transportAllowancePercentage = 0.2;
  } else if (location === 'Ghana') {
    basicSalaryPercentage = 0.6;
    housingAllowancePercentage = 0.15;
    transportAllowancePercentage = 0.25;
  } else {
    // Set default percentages for other countries
    basicSalaryPercentage = 0.5;
    housingAllowancePercentage = 0.2;
    transportAllowancePercentage = 0.1;
  }

  const basicSalary = income * basicSalaryPercentage;
  const housingAllowance = income * housingAllowancePercentage;
  const transportAllowance = income * transportAllowancePercentage;
  const consolidatedSalary = basicSalary + housingAllowance + transportAllowance;

  return consolidatedSalary;
};

const calculateCRA = (consolidatedSalary) => {
  const cra = Math.max(0.01 * consolidatedSalary, 200000) + 0.2 * consolidatedSalary;
  return cra;
};

// Create asynchronous action for calculating tax
export const calculateTaxAsync = createAsyncThunk(
  'financial/calculateTax',
  async ({ location, grossIncome, Benefits, Loan }, thunkAPI) => {
    const consolidatedSalary = getConsolidatedSalary(grossIncome,);
    const cra = calculateCRA(consolidatedSalary);

    // Tax exemption values and tax bands specific to each country
    let taxExemptItems = {};
    let taxBands = [];

    if (location=== 'Nigeria') {
      taxExemptItems = {
        nationalHousingFund: 0,
        nationalHealthInsurance: 0,
        lifeAssurancePremium: 0,
        nationalPensionScheme: 0,
      };
    
      taxBands = [
        { threshold: 300000, rate: 0.07 },
        { threshold: 600000, rate: 0.11 },
        { threshold: 1100000, rate: 0.15 },
        { threshold: 1600000, rate: 0.19 },
        { threshold: 3200000, rate: 0.21 },
        { threshold: Infinity, rate: 0.24 },
      ];
    } else if (location === 'Ghana') {
      taxExemptItems = {
        nationalHousingFund: 0, // Add Ghana-specific value if applicable
        nationalHealthInsurance: 0, // Add Ghana-specific value if applicable
        lifeAssurancePremium: 0, // Add Ghana-specific value if applicable
        nationalPensionScheme: 0, // Add Ghana-specific value if applicable
      };
    
      taxBands = [
        // Add tax bands specific to Ghana
      ];
    } else {
      // Default tax exemption values and tax bands for other countries
  taxExemptItems = {
    nationalHousingFund: 0,
    nationalHealthInsurance: 0,
    lifeAssurancePremium: 0,
    nationalPensionScheme: 0,
  };

    }

    const chargeableIncome = consolidatedSalary - cra;
   



    let taxPayable = 0;


    if (chargeableIncome < 300000) {
      taxPayable = 0.07 * chargeableIncome;
    } else if (chargeableIncome < 600000) {
      taxPayable = 0.07 * 300000 + 0.11 * (chargeableIncome - 300000);
    } else if (chargeableIncome < 1100000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * (chargeableIncome - 600000);
    } else if (chargeableIncome < 1600000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * (chargeableIncome - 1100000);
    } else if (chargeableIncome < 3200000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * 500000 + 0.21 * (chargeableIncome - 1600000);
    } else {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * 500000 + 0.21 * 1600000 + 0.24 * (chargeableIncome - 3200000);
    }

    const annualTaxPayable = taxPayable;
    const monthlyTaxPayable = annualTaxPayable / 12;
    const annualSalary = consolidatedSalary - annualTaxPayable;
    const monthlySalary = annualSalary / 12;
    console.log('results=>',annualSalary ,consolidatedSalary, annualTaxPayable)
    const calculatedValues = {
      consolidatedSalary,
      annualTaxPayable,
      monthlyTaxPayable,
      annualSalary,
      monthlySalary,
     
      // ... other calculated values
    };
    console.log(calculatedValues)
    return calculatedValues;
  
  }
);

// Create a financial slice using createSlice
const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    // Define other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateTaxAsync.fulfilled, (state, action) => {
        // Update state with calculated financial values
        return { ...state, ...action.payload };
      })
      .addCase(calculateTaxAsync.rejected, (state, action) => {
        // Handle rejected case if needed
      });
    // Handle other cases if you have more async actions
  },
});

// Export actions and reducer
export default financialSlice.reducer;
// export { calculateTaxAsync };














// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   isLoading: false,
//   isError: false,
//   errorMessage: '',
//   loanAdded: false,
// };

// export const addLoan = createAsyncThunk('financial/addLoan', async (loanDetail) => {
//   try {
//     const response = await axios.post('/api/v1/employee/add-loan', loanDetail);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// });

// export const updateLoan = createAsyncThunk('financial/updateLoan', async (repayDetail) => {
//   try {
//     const response = await axios.post('/api/v1/employee/update-loan', repayDetail);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// });

// const financialSlice = createSlice({
//   name: 'financial',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.errorMessage = '';
//       state.loanAdded = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addLoan.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.errorMessage = '';
//         state.loanAdded = false;
//       })
//       .addCase(addLoan.fulfilled, (state) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.errorMessage = '';
//         state.loanAdded = true;
//       })
//       .addCase(addLoan.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.error.message;
//         state.loanAdded = false;
//       })
//       .addCase(updateLoan.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.errorMessage = '';
//       })
//       .addCase(updateLoan.fulfilled, (state) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.errorMessage = '';
//       })
//       .addCase(updateLoan.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.error.message;
//       });
//   },
// });

// export const { reset } = financialSlice.actions;

// export default financialSlice.reducer;
