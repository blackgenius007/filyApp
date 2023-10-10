import React, { useState,useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { Icon } from '@mui/material';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Money, CreditCard, TrendingUp } from '@mui/icons-material';
import accounting from 'accounting-js';

const TaxCalculator = ({consolidatedSalary,cra,benefit,loan}) => {
  const [consolidatedSalaryState, setConsolidatedSalary] = useState(0);
  const [annualTaxPayable, setAnnualTaxPayable] = useState(0);
  const [monthlyTaxPayable, setMonthlyTaxPayable] = useState(0);
  const [annualSalary, setAnnualSalary] = useState(0);
  const [monthlySalary, setMonthlySalary] = useState(0);

  useEffect(() => {
    // Hard-coded values for demonstration



    const chargeableIncome = consolidatedSalaryState - cra;

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

    const calculatedAnnualTaxPayable = taxPayable;
    const calculatedMonthlyTaxPayable = calculatedAnnualTaxPayable / 12;
    const calculatedAnnualSalary = consolidatedSalary - calculatedAnnualTaxPayable;
    const calculatedMonthlySalary = calculatedAnnualSalary / 12;

    // Update state with calculated values
    setConsolidatedSalary(consolidatedSalary);
    setAnnualTaxPayable(calculatedAnnualTaxPayable);
    setMonthlyTaxPayable(calculatedMonthlyTaxPayable);
    setAnnualSalary(calculatedAnnualSalary);
    setMonthlySalary(calculatedMonthlySalary);
  }, [consolidatedSalary, consolidatedSalaryState,cra]);


  // Handle money conversion
  const toMoney = (value) => {
    return accounting.formatMoney(accounting.unformat(value), {
      symbol: '',
      precision: 2,
    });
  };

  const getTotalMonthlySalary = () => {
    let total = monthlySalary;
    if (benefit) {
      total += benefit;
    }
    if (loan) {
      total -= loan;
    }
    return total;
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TableContainer>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Consolidated Salary</TableCell>
                  <TableCell>{toMoney(consolidatedSalaryState)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CRA (Consolidated Relief Allowance)</TableCell>
                  <TableCell>{toMoney(cra)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Annual Salary</TableCell>
                  <TableCell>{toMoney(annualSalary)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Monthly Salary</TableCell>
                  <TableCell>{toMoney(monthlySalary)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax Payable per Annum</TableCell>
                  <TableCell>{toMoney(annualTaxPayable)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax Payable per Month</TableCell>
                  {/* <TableCell>{toMoney(monthlyTaxPayable)}</TableCell> */}
                  <TableCell>{toMoney(monthlyTaxPayable)}</TableCell>
                </TableRow>
                {loan && (
                  <TableRow>
                    <TableCell>Loan</TableCell>
                    <TableCell>{toMoney(loan)}</TableCell>
                  </TableRow>
                )}
                {benefit && (
                  <TableRow>
                    <TableCell>Benefit</TableCell>
                    <TableCell>{toMoney(benefit)}</TableCell>
                  </TableRow>
                )}
                {benefit || loan ? (
                  <TableRow>
                    <TableCell>Total Monthly Salary</TableCell>
                    <TableCell>{toMoney(getTotalMonthlySalary())}</TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TaxCalculator;
