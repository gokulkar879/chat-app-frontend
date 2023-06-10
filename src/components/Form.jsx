import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useUserContext } from '../UserContext';
import { AiFillFileAdd } from 'react-icons/ai';

function Form({socket, currentUser, messages, setMessages}) {
  const [text, setText] = useState('');
  const {user} = useUserContext();
  const [file, setFile] = useState('');

  const handleChange = ev => {
    const file = ev.target.files[0];
    const url = URL.createObjectURL(file);
    socket.emit("file", {
      file: file,
      from: user.username,
      to: currentUser
    });
    setMessages([...messages, {_id: Date.now(), text: 'pic', senderId: user.username, recieverId: currentUser.username, imageUrl: url}])
  }


    const handleSubmit = ev => {
        ev.preventDefault();
        console.log("yes")
        socket.emit("sendMessage", {
          text: text,
          from: user.username,
          to: currentUser
        })

        setMessages([...messages, {_id: Date.now(), text: text, senderId: user.username, recieverId: currentUser.username}])
        setText('')
    }

  return (
    <form className='text-form' onSubmit={handleSubmit}>
        <label>
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"></img>
            <input placeholder='Write a message...' value={text} onChange={ev => setText(ev.target.value)}></input>
            <label style={{display: "flex", alignItems: "center", "justifyContent": "center", background: "#2886FF", color: "white", width: "30px", borderRadius: "15px", cursor: "pointer"}}>
              <input type="file" style={{display: "none"}} value={file} onChange={handleChange}></input>
              <AiFillFileAdd />
            </label>
            <button type="submit">Send <FiSend /></button>
        </label>
    </form>
  )
}

export default Form