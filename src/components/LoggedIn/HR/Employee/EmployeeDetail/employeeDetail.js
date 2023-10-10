import React,{useState,useEffect} from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Button, Box } from '@mui/material';
import { retrieveEmployeeById } from '../../../../Services/HR-Services/employeeSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import face from '../../../../../assets/face-0.jpg';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PaymentDetail from './paymentDetail';

const EmployeeProfileCard = () => {


  const dispatch = useDispatch();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [name, setName]= useState();
  const [location, setLocation]= useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = moment().format('YYYY-MM-DD');
        const response = await dispatch(retrieveEmployeeById(id));
        const employee = response.payload; // Access the employee details from the response payload
      
          setEmployeeData(employee);
    
         
        console.log(employee);
      } catch (err) {
        console.log('An error occurred!', err);
      }
    };

    fetchData();
  }, [dispatch, id]);



  // Sample attendance data for the chart
  const attendanceData = [
    {
      date: '2023-07-01',
      attendance: 85,
      sickDays: 2,
      absentDays: 1,
      vacationDays: 0,
      suspendedDays: 0,
    },
    {
      date: '2023-07-02',
      attendance: 90,
      sickDays: 0,
      absentDays: 1,
      vacationDays: 0,
      suspendedDays: 0,
    },
    // Add more data here...
  ];
  const handleEditClick = () => {
    // Handle edit click event
  };

  const handleEditRec = () => {
    // Handle edit recommendation event
  };

  const handleEditPersonal = () => {
    // Handle edit personal details event
  };
 const  handlePayment = (name,country) => {
  setName(name)
  setLocation(country)
         setOpenPayment(true)

  }
  const  closehandlePayment = () => {
    setOpenPayment(false)
}


if (!employeeData || !employeeData.employee) {
  // If employeeData or employeeData.employee is not yet available, show a loading message or handle the case appropriately
  return <div>Loading...</div>;
}
              
  const { employeeName, department, createdAt,country, imagePath } = employeeData.employee;
console.log(employeeName, department, createdAt)
  return (
    <>
    <Card>
      <CardContent>
        {/* Avatar */}
        <Box display="flex" justifyContent="center" mb={3}>

        <div>
{imagePath ? ( <Image
                  style={{ maxHeight: '200px' }}
                  src={imagePath}
                  rounded
                />):(  <img src={face}  style={{ maxHeight: '200px' }}  alt="" />)

                }
               
              </div>

          {/* <Avatar
            alt="Employee Avatar"
            src="path_to_avatar_image.jpg" // Replace with the actual path to the employee's avatar image
            style={{ width: 150, height: 150 }}
          /> */}
        </Box>

        {/* Buttons */}
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item>
            <Button variant="outlined" color="primary">
              Add Photo
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Personal
            </Button>
          </Grid>
          <Grid item>
            <Button  onClick={()=>handlePayment(employeeName,country) }  variant="outlined" color="primary">
              Renumeration
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2" mt={3}>
       {employeeName && employeeName}
        </Typography>
        {/* Add employee details here */}
        {/* e.g., Name, Designation, etc. */}

        {/* Attendance Chart */}
        <Box mt={3}>
          <Typography variant="h6" component="h3">
            Attendance Chart
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sickDays" stroke="#82ca9d" />
              <Line type="monotone" dataKey="absentDays" stroke="#ffc658" />
              <Line type="monotone" dataKey="vacationDays" stroke="#ff6b81" />
              <Line type="monotone" dataKey="suspendedDays" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
    <PaymentDetail
    //  id={id}
     name={name}
     country={location}
       open={openPayment}
           close={closehandlePayment}
    
        />
    </>
  );
}

export default EmployeeProfileCard;




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CheckCircleOutline, PersonOutline } from '@mui/icons-material';
// import { GiCash } from 'react-icons/gi';
// import Image from 'react-bootstrap/Image';
// import moment from 'moment';
// import { useParams, Link } from 'react-router-dom';
// import { retrieveEmployeeById } from '../../../../Services/HR-Services/employeeSlice';
// import { Grid, Typography, Chip } from '@mui/material';
// import EmployeePresenceChart from './EmployeePresenceChart';
// import face from '../../../../../assets/face-0.jpg';
// import PaymentDetail from './paymentDetail';
// import './EmployeeDetail.css'

// const EmployeeDetail = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [employeeData, setEmployeeData] = useState(null);
//   const [openPayment, setOpenPayment] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const date = moment().format('YYYY-MM-DD');
//         const response = await dispatch(retrieveEmployeeById(id));
//         const employee = response.payload; // Access the employee details from the response payload
      
//           setEmployeeData(employee);
    
         
//         console.log(employee);
//       } catch (err) {
//         console.log('An error occurred!', err);
//       }
//     };

//     fetchData();
//   }, [dispatch, id]);

//   const handleEditClick = () => {
//     // Handle edit click event
//   };

//   const handleEditRec = () => {
//     // Handle edit recommendation event
//   };

//   const handleEditPersonal = () => {
//     // Handle edit personal details event
//   };
//  const  handlePayment = () => {
//          setOpenPayment(true)
//   }
//   const  closehandlePayment = () => {
//     setOpenPayment(false)
// }


//   if (!employeeData) {
//     return <div>Loading...</div>;
//   }
      
              
//   const { employeeName, department, createdAt, imagePath } = employeeData.employee;
// console.log(employeeName, department, createdAt)
//   return (
//     <>
//     <div className="Detail-containerv">
//       <Grid container spacing={1}>
//         <Grid md={3} xs={12}>
//           <Link to="/">

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="icon icon-tabler icon-tabler-chevrons-left"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="#9e9e9e"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//               <polyline points="11 7 6 12 11 17" />
//               <polyline points="17 7 12 12 17 17" />
//             </svg>
//           </Link>
//         </Grid>
//         <Grid md={6} xs={12}>
//           <Typography variant="h5">{employeeName && employeeName}</Typography>
//         </Grid>
//       </Grid>
//       <div className="Detail-card-rowv"></div>

//       <div className="Detail-cardv">
//         <div className="Detail-card-rowv">Department : {department}</div>

//         <div className="Detail-card-rowv">
//           Joined on {moment(createdAt).format('Do MMMM YYYY')}
//         </div>
//         <div className="Detail-card">
//           <div className="Detail-card-col align-center">
//             <div className="legends fill-width ">
//               <div>
//                 {imagePath ? ( <Image
//                   style={{ maxHeight: '200px' }}
//                   src={imagePath}
//                   rounded
//                 />):(  <img src={face}  style={{ maxHeight: '200px' }}  alt="" />)

//                 }
               
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="Detail-card-rowv"></div>
//       </div>

     
//       <div className="Detail-card">
//   <div className="Detail-card-row justify-center">
//     <button
//       style={{
//         fontSize: '12px',
//         padding: '5px 10px',
//         backgroundColor: 'transparent',
//         color: 'grey',
//         border: 'none',
//         boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
//         marginRight: '5px',
//       }}
//       onClick={handleEditClick}
//     >
//       Add/edit Photo
//     </button>
//     <button
//       style={{
//         fontSize: '12px',
//         padding: '5px 10px',
//         backgroundColor: 'transparent',
//         color: 'grey',
//         border: 'none',
//         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//         marginRight: '5px',
//       }}
//       onClick={handleEditRec}
//     >
//       <CheckCircleOutline style={{ fontSize: '16px', marginRight: '5px' }} />
//       Recommend
//     </button>
//     <button
//       style={{
//         fontSize: '12px',
//         padding: '5px 10px',
//         backgroundColor: 'transparent',
//         color: 'grey',
//         border: 'none',
//         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//         marginRight: '5px',
//       }}
//       onClick={handleEditPersonal}
//     >
//       <PersonOutline style={{ fontSize: '16px', marginRight: '5px' }} />
//       Personal details
//     </button>
//     <button
//       style={{
//         fontSize: '12px',
//         padding: '5px 10px',
//         backgroundColor: 'transparent',
//               color: 'grey',
//         border: 'none',
//         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//       }}
//       onClick={handlePayment }
//     >
//       <GiCash style={{ fontSize: '16px', marginRight: '5px' }} />
//       Payment details
//     </button>
//   </div>
// </div>
//        <div className="Detail-card">
//         <div >
//           <EmployeePresenceChart employeeData={employeeData} />
//         </div>
//       </div>
//     </div>
//     <PaymentDetail
//      id={id}
//        open={openPayment}
//            close={closehandlePayment}
    
//         />
//     </>
//   );
// };

// export default EmployeeDetail;











