import React from 'react'
import Grid from '@mui/material/Grid';
import Ledger from '../../../Accounting/Ledger'
import EmployeeDetail from './employeeDetail';
function Employee() {


  return (


    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div style={{marginLeft:'30px'}}>
        <EmployeeDetail/>
        
        </div>
    
      </Grid>
      <Grid item xs={6}>
     <Ledger/> 
      </Grid>
    </Grid>
  )
}

export default Employee