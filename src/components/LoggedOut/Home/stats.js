import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const StatisticSection = () => {
  return (
    <div style={{ background: 'white', paddingTop: '30px', paddingBottom: '30px' }}>
      <Container maxWidth="md">
        <Grid container spacing={3} justifyContent="center">
          {/* Stat 1 */}
          <Grid item xs={12} sm={4}>
            <Paper style={{ background: 'lightgrey', padding: '20px', textAlign: 'center' }}>
              <Typography variant="h5" component="h3">
                Number of Organizations
              </Typography>
              <Typography variant="h4" component="h2">
                1000
              </Typography>
            </Paper>
          </Grid>

          {/* Stat 2 */}
          <Grid item xs={12} sm={4}>
            <Paper style={{ background: 'lightgrey', padding: '20px', textAlign: 'center' }}>
              <Typography variant="h5" component="h3">
                Total Number of Employees
              </Typography>
              <Typography variant="h4" component="h2">
                5000
              </Typography>
            </Paper>
          </Grid>

          {/* Stat 3 */}
          <Grid item xs={12} sm={4}>
            <Paper style={{ background: 'lightgrey', padding: '20px', textAlign: 'center' }}>
              <Typography variant="h5" component="h3">
                Total Number of Transactions
              </Typography>
              <Typography variant="h4" component="h2">
                10000
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default StatisticSection;
