import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Card, CardContent } from '@mui/material';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [predictedItems, setPredictedItems] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch inventory data from API or database
    // Update the state using setInventory
    // Example: setInventory([...fetchedInventoryData]);

    // Perform prediction for items about to finish
    // Update the state using setPredictedItems
    // Example: setPredictedItems([...predictedItemsData]);
  }, []);
 
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#00aaff', marginBottom: '20px' }}>
        Inventory Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card elevation={3} style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Available Stock
              </Typography>
              <ul>
                {data.map(item => (
                  <li key={item.id}>
                    {item.name}: {item.quantity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card elevation={3} style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cost of All Items in Stock
              </Typography>
              <Typography>
                Total cost: $
                {inventory.reduce((totalCost, item) => totalCost + item.cost * item.quantity, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ backgroundColor: '#222', padding: '20px', color: '#fff' }}>
            <Typography variant="h5" gutterBottom>
              Items Predicted to Finish Soon
            </Typography>
            <ul>
              {predictedItems.map(item => (
                <li key={item.id}>
                  {item.name} - Predicted to finish soon
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InventoryManagement;



// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// // import { monthlyUsage } from '../../../../logged_out/features/inventory/inventorySlice';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Card,
//   Divider,
//   Button,
//   Avatar,
//   CardContent,
// } from '@mui/material';
// import { IconContext } from 'react-icons';
// import { Popup } from 'semantic-ui-react';
// import { FcBusinessContact } from 'react-icons/fc';
// import {GiShoppingCart} from 'react-icons/gi';
// import PropTypes from 'prop-types';
// // import PieChat2 from '../../../components/dashboard/Stats/PieChat2';

// function InventoryManagement() {
//   const dispatch = useDispatch();
//   const [data, setData] = useState([]);
//   const [quantity, setQuantity] = useState(0);
//   const [leadTime, setLeadTime] = useState(15);
//   const [reorderDelay, setReorderDelay] = useState(0);
//   const [qtyLeft, setQtyLeft] = useState(0);
//   const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());
//   const [averageDayUsage, setAverageDayUsage] = useState(28);
//   const [open, setOpen] = useState(28);

// //   const { user } = useSelector((state) => state.auth);
// //   const { usage } = useSelector((state) => state.inventory);

// //   useEffect(() => {
// //     // dispatch(monthlyUsage(user.email));
// //   }, [dispatch, user.email]);

//   //Computes the current month number
//   const today = new Date(); //Thu Jun 18 2020 10:17:04 GMT-0300
//   const month = ('0' + (today.getMonth() + 1)).slice(-2);

//   // get all Item usage on each item by month
// //   const GroupedByMonth = Object.values(
// //     usage.reduce((acc, curr) => {
// //       if (curr._id.month === month) {
// //         return (
// //           (acc[curr._id.name] = {
// //             month: curr._id.month,
// //             name: curr._id.name,
// //             quantity: curr._id.quantity,
// //             totalAmountSold:
// //               (acc[curr._id.name]?.totalAmountSold || 0) + curr.totalAmountSold,
// //           }),
// //           acc
// //         );
// //       }
// //       return acc;
// //     }, {})
// //   );
// //   console.log(GroupedByMonth);
//   return (
//     <>
//       <Card  style={{ borderRadius: 6, minWidth: 256, textAlign: 'center' }}>
//         <CardContent>
//           <div>
//             <h5>
//               {GroupedByMonth.quantity > 0
//                 ? ` Safety stock threshold exceeded, Kindly re-order the following ${data.length} items`
//                 : `No urgent need to re-order an item`}  <IconContext.Provider
//                 value={{ color: '#B22222', size: '30px' }}
//               >
//            <GiShoppingCart/>
//               </IconContext.Provider>
//             </h5>
//           </div>

//           {GroupedByMonth.filter(
//             (monthlyUsage) =>
//               monthlyUsage.quantity <
//               (monthlyUsage.totalAmountSold / daysInMonth) * 15
//           ).map((filteredItem) => (
//             <List>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar>
//                     <Avatar src={filteredItem.imagePath} />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={filteredItem.itemName}
//                   secondary={` last date  : ${moment(
//                     `${filteredItem.updatedAt}`,
//                     'YYYYMMDD'
//                   ).fromNow()}`}
//                 />
//                 <IconContext.Provider value={{ size: '35px' }}>
//                   <Button>
//                     <Popup
//                       trigger={<FcBusinessContact />}
//                       position="bottom center"
//                     >
//                       Last supplier's detail
//                     </Popup>
//                   </Button>
//                 </IconContext.Provider>
//               </ListItem>
//             </List>
//           ))}
//         </CardContent>

//         {GroupedByMonth.quantity > 0 ? (
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="secondary"
//             size="large"

//             // onClick={OpenModal}
//           >
//             Re-Order online
//           </Button>
//         ) : (
//           ''
//         )}
//         <Divider />
//         {/* <PieChat2 projectname={projectname}/> */}
//       </Card>
//     </>
//   );
// }

// export default InventoryManagement;
