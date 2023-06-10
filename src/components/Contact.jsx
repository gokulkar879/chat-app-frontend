import React from 'react'
import { useUserContext } from '../UserContext';

function Contact({username, userId, setCurrentUser, socket}) {
  const { user } = useUserContext();

  const handleClick = ev => {
    setCurrentUser({username, userId});

    socket.emit("getMessages", {
      from: user.username,
      to: username
    })

  }

  return (
    <div className='contact' onClick={handleClick}>
        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"></img>
        <div className='contact-info'>
            <p className='contact-name'>{username}</p>
            <p className='contact-lastMessage'>Hello world!</p>
        </div>
    </div>
  )
}

export default Contact