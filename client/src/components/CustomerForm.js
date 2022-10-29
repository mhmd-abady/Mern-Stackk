import axios from 'axios';
import React, { useState } from 'react'
import {isPossiblePhoneNumber,isValidNumber,
isPossibleNumber,isValidPhoneNumber} from 'libphonenumber-js'

function CustomerForm({getCustomers}) {

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');

    async function addCustomer(e){
        e.preventDefault();
        if(document.getElementById('message').textContent==='invalid phoneNumber'){
          return alert('chk ur inpts')
        }
        else{
          const customerData = {
              name,
              address,
              phoneNumber
          }
            await axios.post('http://localhost:5000/customers/',customerData);
          
          setPhoneNumber('');
          setName('');
          setAddress(''); 
          getCustomers();
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
        <form onSubmit={addCustomer} >
          <input type='text'
          placeholder='name'
          onChange={(e)=>setName(e.target.value)}
          value={name}
          />

          <input type='text'
          placeholder='address'
          onChange={(e)=>setAddress(e.target.value)}
          value={address}
          />

          <input type='text'
          placeholder='phoneNumber'
          onChange={(e)=>setPhoneNumber(e.target.value)}
          value={phoneNumber}
          onKeyUp={validate}
          />
          <div id='message' >
            
          </div>
        <button type='submit' >save customer</button>
        </form>
    </div>
  )
}

//mongodb+srv://mhmdAbady:mhmdAbady123@cluster0.zayxitq.mongodb.net/?retryWrites=true&w=majority

export default CustomerForm