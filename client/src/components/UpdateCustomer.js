import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    isValidNumber,
    isPossibleNumber,
    isValidPhoneNumber,
    isPossiblePhoneNumber
} from 'libphonenumber-js';


function UpdateCustomer(props) {
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    async function getCustomer(){
       await axios.get('http://localhost:5000/customers/'+params.id)
       .then(response=>{
        setName(response.data.name);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phoneNumber);
       }).catch(error=>console.log(error))
    }   
    useEffect(()=>{
        getCustomer();
    },[])

    async function updateCustomer(e){
        e.preventDefault();
        if(document.getElementById('message').textContent === 'invalid phoneNumber'){
            return alert('please check inputs')
    }
        else{
        const newData = {
            name,address,phoneNumber
        }
       await axios.post('http://localhost:5000/customers/update/'+params.id,newData);
        navigate('/customer')
        }
    }

    function validate(e){
        var num = e.target.value;
        var item = document.getElementById('message');
        if(isValidNumber(num,'LB')===true &&
        isPossibleNumber(num,'LB')===true &&
        isValidPhoneNumber(num,'LB')===true &&
        isPossiblePhoneNumber(num,'LB')===true){
          item.innerHTML = 'valid phoneNumber'
        }else{
          item.innerHTML = 'invalid phoneNumber'
        }
      }

  return (
    <div>
     <h1>Update here</h1>
     <form onSubmit={updateCustomer}>
        <input 
        type='text'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

         <input 
        onChange={(e)=>setAddress(e.target.value)}
        value={address}
        />
        
        <input 
          onChange={(e)=>setPhoneNumber(e.target.value)}
          value={phoneNumber}
          onKeyUp={validate}
          />
          <div id='message' >
            
          </div>
    <button type='submit'>update</button>
    </form>
    </div>
  )
}

export default UpdateCustomer