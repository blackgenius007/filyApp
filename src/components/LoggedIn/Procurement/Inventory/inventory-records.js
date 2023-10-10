import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import moment from  'moment';
import { FcBusinessContact } from 'react-icons/fc';
import PersonIcon from '@mui/icons-material/Person';
 import axios from 'axios';
import { Popup } from 'semantic-ui-react';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';


import { Container, Typography, Grid,DialogTitle,Card,Divider,Dialog,Avatar, CardContent, Button, Icon,List,
  ListItem,
  ListItemText,
  ListItemAvatar, } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import stockManagement from './stockManagement';

const InventoryManagement = () => {
  const [predictedItems, setPredictedItems] = useState([]);
  const [replacementItems, setReplacementItems] = useState([]);
  const [detail, setDetail] = useState([]);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = React.useState();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Example predicted items data: ['Item B', 'Item D']
    // Update the state using setPredictedItems
    setPredictedItems(['Item B', 'Item D']);

    // Example replacement items data: ['Item C', 'Item E']
    // Update the state using setReplacementItems
    setReplacementItems(['Item C', 'Item E']);
  }, []);
  // item modal
  const handleModalOpen = (id) => {
    const fetchSupplierDetail = async () => {
      const res = await axios.get(`/api/v1/inventory/${id}`, {});

      if (res.data) {
        setDetail(res.data);
        console.log(res.data);
      }
    };
    fetchSupplierDetail();
    setOpen(true);
    setSelectedId(id);
  };

  const handleModalClose = () => {
    setOpen(false);
  };



  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
  <Typography variant="h4" gutterBottom style={{ color: '#00aaff', marginBottom: '20px' }}>
    Inventory Management System
  </Typography>

  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <Card elevation={3} style={{ backgroundColor: '#e0eaf1', borderRadius: '10px', padding: '15px', width: '100%', height: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <Icon color="primary" fontSize="large">
              <InfoOutlinedIcon fontSize="inherit" />   
            </Icon>
            Inventory Sheet
          </Typography>
          <Link to="/inventory-sheet">
            <Button variant="contained" color="primary" size="small">
              View Inventory
            </Button>
          </Link>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            {/* Your inventory snapshot content */}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Card elevation={3} style={{ backgroundColor: '#e0eaf1', borderRadius: '10px', padding: '15px', width: '100%', height: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <Icon color="primary" fontSize="large">
              <MonetizationOnOutlinedIcon fontSize="inherit" />
            </Icon>
            Cost of All Assets    
          </Typography>
          <Typography variant="h4" style={{ marginTop: '10px', color: '#333' }}>
            Total Cost: $XX,XXX
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Card elevation={3} style={{ backgroundColor: '#e0eaf1', borderRadius: '10px', padding: '15px', width: '100%', height: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <Icon color="primary" fontSize="large">
              <UpdateOutlinedIcon fontSize="inherit" />
            </Icon>
            Items Predicted to Finish Soon
          </Typography>
          {predictedItems.map((item, index) => (
            <Typography variant="body1" key={index} style={{ marginTop: '10px' }}>
              {item}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Card elevation={3} style={{ backgroundColor: '#e0eaf1', borderRadius: '10px', padding: '15px', width: '100%', height: '100%' }}>
        <CardContent>
          <Card elevation={3} style={{ borderRadius: 12, minWidth: 256, width: '100%', textAlign: 'center', height: '100%' }}>
            <CardContent>
              <h4 className="textItemdashboard">
                {data.length <= 0
                  ? `${data.length} item is out of stock`
                  : `${data.length} items are out of stock`}
              </h4>
              <Divider />
              {data.map((item) => (
                <div key={item._id}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Avatar src={item.imagePath} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.itemName}
                        secondary={`Out of stock: ${moment(
                          `${item.updatedAt}`,
                          'YYYYMMDD'
                        ).fromNow()}`}
                      />
                      <IconContext.Provider value={{ size: '35px' }}>
                        <Button onClick={() => handleModalOpen(item._id)}>
                          <Popup
                            trigger={<FcBusinessContact />}
                            position="bottom center"
                          >
                            Last supplier's detail
                          </Popup>
                        </Button>
                      </IconContext.Provider>
                    </ListItem>
                  </List>
                </div>
              ))}
              <br />

              <div className="btn-group-dynamic">
                <Link>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Order from Local Merchant
                  </Button>
                </Link>
              </div>
            </CardContent>
            <Divider light />
          </Card>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Container>

  );
};

export default InventoryManagement;
