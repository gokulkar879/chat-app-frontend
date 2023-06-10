import React from 'react';
import Contact from './Contact';
import { FiSettings } from 'react-icons/fi';
import { useUserContext } from '../UserContext';


function Contacts({contacts, setCurrentUser, socket}) {
  const { user } = useUserContext();

  return (
    <div className='contacts'>
        <div className='contacts-header'>
            <p>Account</p>
            <button><FiSettings /></button>
        </div>
        <div className='contacts-info'>
            {
              contacts.map(contact => {
                const {username, userId} = contact;
                  return <Contact key={userId} username={username} userId={userId} setCurrentUser={setCurrentUser} socket={socket}/>
              })
            }
        </div>
    </div>
  )
}

export default Contacts