import React, { useEffect } from 'react'

import firebase from './firebase';

import Router from './Router';
import axios from 'axios';
import { AuthContextProvider } from './Context/authContext';
axios.defaults.withCredentials = true;



function App() {
  useEffect(()=>{
    const messaging = firebase.messaging();
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
      console.log('token '+ token);
    })
  },[])
  return (
    <AuthContextProvider>
    <Router />
    </AuthContextProvider>
  );
}

export default App;
