import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../Context/authContext';
import LogOutBtn from './auth/LogOutBtn';

function Navbar() {

  const {loggedIn} = useContext(AuthContext);
  
  return (
    <div className='links' >
        <Link className='home' to='/' >Home</Link>
        { loggedIn === false &&  ( 
        <> 
        <Link to='/register' className='reg' >Register</Link>
        <Link to='/login' >Login</Link>
        </> 
           )
        }
        
        { loggedIn===true &&
        (<>
        <Link to='/customer' >Customers</Link>
        <LogOutBtn />
        </>)
         }
        

    </div>
  )
}

export default Navbar