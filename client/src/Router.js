import React, { useContext } from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthContext from './Context/authContext';
import Customer from './components/Customer';
import UpdateCustomer from './components/UpdateCustomer';

function Router() {

  const {loggedIn} = useContext(AuthContext);

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route exact path='/' >
    Home
        </Route>
    {
      loggedIn === false && (
        <>
        <Route path='/register' element={<Register/>} />
    
    <Route path='/login'  element={<Login/>} />
        </>
      )
    }

        {loggedIn === true &&
        (<>
        <Route path='/customer' element={<Customer/>} />
                  <Route path='/:id' element={<UpdateCustomer/>}/>
       </>) }
   

    </Routes>
    </BrowserRouter>
  )
}

export default Router