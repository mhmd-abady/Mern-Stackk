import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function CustomerList({customers,getCustomers}) {
  /* const [isHover, setIsHover] = useState(false);
   const handleMouseEnter = ()=>{
    setIsHover(true);
   }
   const handleMouseLeave =()=>{
    setIsHover(false)
   }
    const styles = {
    edit:{
        color:'darkblue',
        backgroundColor:'rgb(139, 181, 218)',
        border:'0',
        padding:'0',
    },
    a:{
        padding:0,
        border:0,
        color:'darkblue',
        backgroundColor:'rgb(139, 181, 218)',
    },
    
   }*/
   
    const navigate = useNavigate();
    function renderCustomers(){
        return customers.map((customer,i)=>{
            return( <>
            <li key={i} className='lii' >
                {customer.name +'  | '+ customer.address+' | '+customer.phoneNumber}
                <span>
                    <Link className='edit' 
                     to={'/'+customer._id}>edit</Link> &nbsp; | &nbsp;
                    <a className='aa' href='#' onClick={()=>deleteReq(customer._id)} > delete</a>
                </span>
                </li>
                
           
            </>
            )
        })
    }
    async function deleteReq(id){
       // console.log('call delete func: '+id)
        await axios.delete('http://localhost:5000/customers/'+id)
        getCustomers();
        navigate('/customer')
    }

    function SearchCustomers(e){
        var search = document.getElementById('search');
        search.addEventListener('keyup',SearchCustomers);

        var text = e.target.value.toLowerCase();
        var custs = document.getElementsByTagName('li');

        Array.from(custs).forEach(function(item){
            var itemName = item.textContent;

            if(itemName.toLowerCase().indexOf(text) !==-1 ){
                item.style.display = 'flex';                
              }else{
                item.style.display = 'none';
              }
        })
    }
  return (
    <div>
        
        <input type='text'
        placeholder='search...'
        id='search'
        onKeyUp={SearchCustomers}/>

        <ul className='list' >
            {renderCustomers()}
        </ul>
    </div>
  )
}

export default CustomerList