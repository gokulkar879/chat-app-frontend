import React, {useState} from 'react';
import { FiEdit, FiSettings } from 'react-icons/fi';
import { useUserContext } from '../UserContext';

function User() {
  const [isHovering, setisHovering] = useState(false); 
  const [avatar, setAvatar] = useState('');
  const {setUser} = useUserContext();

  const handleChange = ev => {
    const file = ev.target.files[0];
    const data = new FormData();
    data.set('avatar', file);
    const requestOptions = {
      method: 'PATCH',
      body: data,
      credentials: 'include'
    }

    fetch('https://chat-app-backend-3kda.onrender.com/user', requestOptions)
       .then(res => res.json())
       .then(data => {
           console.log(data);
           setUser(data.user);
       }).catch(err => {
        console.log(err);
       })
  }

  const handleMouseOver = ev => {
    setisHovering(true);
  }

  const handleMouseOut = ev => {
    setisHovering(false);
  }
  return (
    <div className='user'>
        <div className='user-header'>
            <p>Account</p>
            <button><FiSettings /></button>
        </div>
        <div className='user-info'>
          <div className='avatar-div' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {
              isHovering ? <label className='avatar'>
                 <input className="avatar-input" type='file' value={avatar} onChange={handleChange}></input>
                 <FiEdit />
              </label> : <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"></img>
            }
          </div>
            <p className='user-name'>Gokul</p>
        </div>
    </div>
  )
}

export default User