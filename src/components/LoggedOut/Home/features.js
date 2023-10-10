import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { RiBuilding2Fill, RiBriefcaseFill, RiShoppingCart2Fill } from 'react-icons/ri';

const FeatureSection = () => {
  return (
    <div style={{ background: 'white', paddingTop: '30px', paddingBottom: '30px' }}>
      <Container maxWidth="md">

        <Grid container spacing={3} justifyContent="center">
          {/* Feature 1 - HR */}
          <Grid item xs={12} sm={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: 'orange',
                  borderRadius: '50%',
                  padding: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RiBuilding2Fill style={{ fontSize: '30px', color: 'white' }} />
              </div>
            </div>
            <Typography variant="h6" component="h3" align="center" color="textPrimary">
              HR
            </Typography>
            <Typography align="center" color="textSecondary">
              Manage human resources efficiently.
            </Typography>
          </Grid>

          {/* Feature 2 - Accounts */}
          <Grid item xs={12} sm={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: 'orange',
                  borderRadius: '50%',
                  padding: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RiBriefcaseFill style={{ fontSize: '30px', color: 'white' }} />
              </div>
            </div>
            <Typography variant="h6" component="h3" align="center" color="textPrimary">
              Accounts
            </Typography>
            <Typography align="center" color="textSecondary">
              Manage financial accounts and transactions.
            </Typography>
          </Grid>

          {/* Feature 3 - Procurement */}
          <Grid item xs={12} sm={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: 'orange',
                  borderRadius: '50%',
                  padding: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RiShoppingCart2Fill style={{ fontSize: '30px', color: 'white' }} />
              </div>
            </div>
            <Typography variant="h6" component="h3" align="center" color="textPrimary">
              Procurement
            </Typography>
            <Typography align="center" color="textSecondary">
              Manage procurement and supply chain processes.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FeatureSection;








// import React from 'react';
// import { Container, Grid, Typography } from '@mui/material';
// import { RiBook2Line, RiTimerLine, RiHeadphoneLine } from 'react-icons/ri';

// const FeatureSection = () => {
//   return (
//     <div style={{ background: 'white', paddingTop: '30px', paddingBottom: '30px' }}>
//       <Container maxWidth="md">
//         <Grid container spacing={3} justifyContent="center">
//           {/* Feature 1 */}
//           <Grid item xs={12} sm={4}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <div
//                 style={{
//                   backgroundColor: 'orange',
//                   borderRadius: '50%',
//                   padding: '10px',
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <RiBook2Line style={{ fontSize: '30px', color: 'white' }} />
//               </div>
//             </div>
//             <Typography variant="h6" component="h3" align="center" color="textPrimary">
//               Read
//             </Typography>
//             <Typography align="center" color="textSecondary">
//               Explore a vast library of books and summaries.
//             </Typography>
//           </Grid>

//           {/* Feature 2 */}
//           <Grid item xs={12} sm={4}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <div
//                 style={{
//                   backgroundColor: 'orange',
//                   borderRadius: '50%',
//                   padding: '10px',
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <RiTimerLine style={{ fontSize: '30px', color: 'white' }} />
//               </div>
//             </div>
//             <Typography variant="h6" component="h3" align="center" color="textPrimary">
//               Time-Saving
//             </Typography>
//             <Typography align="center" color="textSecondary">
//               Get key insights in just a few minutes.
//             </Typography>
//           </Grid>

//           {/* Feature 3 */}
//           <Grid item xs={12} sm={4}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <div
//                 style={{
//                   backgroundColor: 'orange',
//                   borderRadius: '50%',
//                   padding: '10px',
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <RiHeadphoneLine style={{ fontSize: '30px', color: 'white' }} />
//               </div>
//             </div>
//             <Typography variant="h6" component="h3" align="center" color="textPrimary">
//               Listen
//             </Typography>
//             <Typography align="center" color="textSecondary">
//               Enjoy audio versions of your favorite books.
//             </Typography>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default FeatureSection;

