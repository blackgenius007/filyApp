// import React, {
//     useState,
//     useCallback,
//     useRef,
//     Fragment,
//     useEffect,
//   } from 'react';
//   import { useDispatch, useSelector } from 'react-redux';
//   import axios from 'axios';
 
  
//   import {
//     Typography,
//     Dialog,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemAvatar,
//     DialogActions,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     Divider,
//     Box,
//     Button,
//     CardHeader,
//     Avatar,
 
//     Card,
//     Slide,
//     CardContent,
//     Grid,
//     CardActionArea,
//     CardActions,
//     IconButton,
//   } from '@mui/material';
 

//   import Paper from '@mui/icons-material';
//   import { IconContext } from 'react-icons';
//   import SaveIcon from '@mui/icons-material/Save';
//   import { TiEdit } from 'react-icons/ti';
//   import { FcBusinessContact } from 'react-icons/fc';
//   import {
//     AiOutlineFire,
//     AiOutlineCalculator,
//     AiOutlineBranches,
//     AiOutlineDislike,
//   } from 'react-icons/ai';
//   import { ImStatsDots, ImTable2 } from 'react-icons/im';
//   import { Link, useParams, useHistory } from 'react-router-dom';
//   import moment from 'moment';
//   import Carousel from './carousel';
//   import InventoryManagement from './stockManagement';
//   import Supplier from './supplierModal';
//   import PersonIcon from '@mui/icons-material/Person';
 
//   import { Popup } from 'semantic-ui-react';
//   import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
 
  
   
//   function Stock({ projectname, page }) {
      
//     const { user } = useSelector((state) => state.auth);
  
//     const [stock, setStock] = useState([]);
//     const [data, setData] = useState([]);
//     const [q, setQ] = useState('');
//     const [Loading, setLoading] = useState(false);
//     console.log('=>from stock-panel=>', user.email, projectname);
//     const [open, setOpen] = React.useState(false);
//     const [selectedId, setSelectedId] = React.useState();
//     const [detail, setDetail] = useState([]);
//     const [data, setDetail] = useState([]);
  
//     const handleModalOpen = (id) => {
//       const fetchSupplierDetail = async () => {
//         const res = await axios.get(`/api/v1/inventory/${id}`, {});
  
//         if (res.data) {
//           setDetail(res.data);
//           console.log(res.data);
//         }
//       };
//       fetchSupplierDetail();
//       setOpen(true);
//       setSelectedId(id);
//     };
  
//     const handleModalClose = () => {
//       setOpen(false);
//     };
  
//     // useEffect(() => {
//     //   fetch(`/api/v1/inventory/stockbalance/${user.email}/${projectname} `)
//     //     .then((response) => response.json())
//     //     .then((json) => setData(json));
//     //   console.log('stock detail =>', data);
//     // }, [data, projectname, user.email]);
  
//     const openInNewTab = (url) => {
//       var win = window.open('https://www.amazon.com/', '_blank');
//       win.focus();
//     };
  
//     // const openPriceList=()=>{
//     //   history.push(`/c/merchant/${page}/${projectname}` );
//     // }
  
//     return (
//       <>
//         <Grid container spacing={0}>
//           <Grid>
//             <Card
//               style={{ borderRadius: 12, minWidth: 256, textAlign: 'center' }}
//             >
//               <CardContent>
//                 <h4 className="textItemdashboard">
//                   {data.length <= 0
//                     ? `${data.length} item are out of stock`
//                     : `${data.length} items is out of stock`}
//                 </h4>
//                 <Divider />
//                 {data.map((item) => (
//                   <div key={item._id}>
//                     <List  >
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar>
//                             <Avatar src={item.imagePath} />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText
//                           primary={item.itemName}
//                           secondary={` out of stock : ${moment(
//                             `${item.updatedAt}`,
//                             'YYYYMMDD'
//                           ).fromNow()}`}
//                         />
//                         <IconContext.Provider value={{ size: '35px' }}>
//                           <Button onClick={() => handleModalOpen(item._id)}>
//                             <Popup
//                               trigger={<FcBusinessContact />}
//                               position="bottom center"
//                             >
//                               Last supplier's detail
//                             </Popup>
//                           </Button>
//                         </IconContext.Provider>
//                       </ListItem>
//                     </List>
//                   </div>
//                 ))}
//                 <br />
  
//                 <div class="btn-group-dynamic">
//                   <Link to={`/employer/price-list/${page}/${projectname}`}>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       fullWidth
//                       // onClick={openPriceList}
                      
                       
//                       // href="https://github.com/dunky11/react-saas-template"
//                     >
//                       Order from Local Merchant
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//               <Divider light />
//             </Card>
//           </Grid>
//         </Grid>
//         <Grid>
//           <Dialog
//             onClose={handleModalClose}
//             aria-labelledby="simple-dialog-title"
//             open={open}
//           >
//             <DialogTitle id="simple-dialog-title">
//               Current supplier detail
//             </DialogTitle>
//             <List>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar  >
//                     <PersonIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary={detail.supplier} />
//               </ListItem>
  
//               <ListItem autoFocus>
//                 <ListItemAvatar>
//                   <Avatar>
//                     <EmailTwoToneIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary={detail.supplier_email} />
//               </ListItem>
//             </List>
//           </Dialog>
//           <br />
//         </Grid>
//       </>
//     );
//   }
  
//   export default Stock;
  