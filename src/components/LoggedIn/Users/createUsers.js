import React, { useState,useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { register } from '../../Services/AuthServices/authSlice';

const CreateUserForm = () => {
   
    const dispatch = useDispatch();
    const { user} = useSelector((state) => state.auth );
    const[userDetail,setUserDetail]=useState([])

useEffect(() => {
if(user){
  setUserDetail(user.data)
}

}, [user])


  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'user',
  });

 
  const ownerEmail=userDetail.email;
  const ownerId=userDetail._id;
  const{ businessName, businessSector}=userDetail

  const {
    role,
    userName,
    email,
    password,
    password2,
  } = userData;

  const RegistrationData={
    role,
    userName,
    email,
    businessName,         
    businessSector,
    password,
    password2,
    ownerEmail,
    ownerId
  }


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    alert('submitted!!')
    e.preventDefault();
    dispatch(register(RegistrationData));
    console.log(RegistrationData,user);
  };


  return (
    <div style={styles.container}>
      <form >
        <Typography variant="h7">CREATE NEW USER</Typography>
        <br />
        <br />

        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="Full name..."
          style={styles.input}
          value={userData.userName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your email..."
          style={styles.input}
          value={userData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Your password..."
          style={styles.input}
          value={userData.password}
          onChange={handleChange}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          style={styles.input}
          value={userData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={onSubmit} value="Submit" style={styles.submitButton} >Submit</button>
      </form>
    </div>
  );
};

export default CreateUserForm;

const styles = {
  container: {
    margin: 'auto',
    width: '30%',
    borderRadius: '5px',
    backgroundColor: '#ededed',
    padding: '20px',
    fontFamily: "'Work Sans', sans-serif",
  },
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#016a70',
    color: 'white',
    padding: '14px 20px',
    marginTop: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};








