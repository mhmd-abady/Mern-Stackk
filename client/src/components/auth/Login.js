import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/authContext';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const {getLoggedIn} = useContext(AuthContext);

    async function login(e){
        e.preventDefault();


        try {
            const loginData = {
                email,
                password
            };

            await axios.post('http://localhost:5000/auth/login',loginData);
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
        <h1>Login here</h1>
        <form onSubmit={login} >
            <input type='email'
            placeholder='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />

            <input type='password'
            placeholder='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit' >Login</button>
        </form>
    </div>
  )
}

export default Login