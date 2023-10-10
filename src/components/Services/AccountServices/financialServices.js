// financialService.js
import axios from 'axios';

const API_URL_ADD = '/api/v1/employee/add-loan';
const API_URL_UPDATE = '/api/v1/employee/update-loan';
const API_URL_OFF = '/api/v1/employee/loan-off';
const API_URL_OVERTIMERESET  = '/api/v1/employee/overtimeReset';
const API_URL_ADD_OVERTIME = '/api/v1/employee/overtimeAdder';
const API_URL_ADD_ALLOWANCE = '/api/v1/employee/allowance';
const API_URL_ADD_IOU = '/api/v1/employee/IOU';

 

const addLoan = async (loanDetail) => {
    try {
      const response = await axios.post(API_URL_ADD, loanDetail);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
   
const updateLoan = async (repayDetail) => {
  const response = await axios.post(API_URL_UPDATE, repayDetail);
  return response.data;
};      

const loanPayOff = async (today) => {
  const response = await axios.post(API_URL_OFF, today);
  return response.data;
};               

const allowanceReset = async ( email, overtime) => {
  const response = await axios.post(`${API_URL_UPDATE}/${email}/${overtime}` );
  return response.data;
};

const addOvertime = async ( id, value) => {   
  console.log('overtime-services==>',value,id);  

  const response = await axios.post(`${API_URL_ADD_OVERTIME}/${id}/${value}` );
  return response.data;
};
const addAllowance = async ( id, value) => {   
  console.log('overtime-services==>',value,id);  

  const response = await axios.post(`${API_URL_ADD_ALLOWANCE}/${id}/${value}` );
  return response.data;
};    
const addIOU = async ( id, value) => {   
   const response = await axios.post(`${API_URL_ADD_IOU}/${id}/${value}` );
  return response.data;
};    
    

const financialService = {
  updateLoan,
  addLoan,
  loanPayOff,
  addOvertime,
  addAllowance,
  addIOU  
};

export default financialService;
