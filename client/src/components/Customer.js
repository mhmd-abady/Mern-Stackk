import axios from 'axios';
import {Routes,Route} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'
import UpdateCustomer from './UpdateCustomer';

function Customer() {
  const [customers,setCustomers] = useState([]);

  async function getCustomers(){
    const CustomersRes = await axios.get('http://localhost:5000/customers/');
    setCustomers(CustomersRes.data);
  }
  //added also
async function refresh(){
  const res = await axios.get('http://localhost:5000/auth/refresh');
  const data = await res.data;
  return data;
}
  useEffect(()=>{
    getCustomers();
    //added
    let interval = setInterval(()=>{
      refresh()
    },1000*22);
    return ()=> clearInterval(interval);
  },[]);

  return (
    <div>
      <CustomerForm getCustomers={getCustomers}  /> 
      <CustomerList customers = {customers}
      getCustomers={getCustomers} /> 
    
      
    </div>
  )
}

export default Customer