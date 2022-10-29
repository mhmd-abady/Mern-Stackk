import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/authContext';

function Register() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const {getLoggedIn} = useContext(AuthContext);

    async function register(e){
        e.preventDefault();

        try {
            const registerData ={
                email,
                password
            };

            await axios.post('http://localhost:5000/auth/',registerData);
            setEmail('');
            setPassword('');
            await getLoggedIn();
            navigate('/customer');

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h1>
        Register a new Acocunt
        </h1>
        <form onSubmit={register} >
            <input type='email'
            onChange={(e)=> setEmail(e.target.value)}
            placeholder='email'
            value={email}/>

            <input type='password' 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='password'
            value={password}/>

            <button type='submit'>register</button>
        </form>
        </div>
  )
}

export default Register