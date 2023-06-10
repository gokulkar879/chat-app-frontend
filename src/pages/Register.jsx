import React, { useState } from 'react'
import { useUserContext } from '../UserContext';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUserContext();

    const handleSubmit = ev => {
        ev.preventDefault();

        if(!username || !password) return;

        fetch('https://chat-app-backend-3kda.onrender.com', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({username, password}),
            credentials: 'include'
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            setUser(data.user);
          }).catch(err => {
            console.log(err);
          })

    }

  return (
    <div className='register'>
        <form className='register-form' onSubmit={handleSubmit}>
            <div></div>
            <label>
                <p>Username</p>
                <input placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)}></input>
            </label>
            <label>
                <p>Password</p>
                <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)}></input>
            </label>
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default Register