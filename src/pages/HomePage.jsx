import React, { useEffect, useRef, useState } from 'react';
import User from '../components/User';
import Contacts from '../components/Contacts';
import Message from '../components/Message';
import Form from '../components/Form.jsx';
import {io} from 'socket.io-client';
import { useUserContext } from '../UserContext';
const socket = io('http://localhost:5000', {
    autoConnect: false
});

function HomePage() {
    
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [messages, setMessages] = useState([]);
    const { user, setUser } = useUserContext();
    const divUnderMessage = useRef();

    const removeUser = (users) => {
        const new_users = users.filter(_user => _user.username != user.username);
        return new_users;
    }

    const onUserAuthenticated = ev => {
        socket.auth = { 'username': user.username} ;
        socket.connect();
    }

    socket.on("users", (users) => {
        const _users = removeUser(users);
        if(currentUser) {
            const _ = _users.filter(user => user.username == currentUser.username);
            setCurrentUser(_);
        }
        setContacts(_users);
    })


    socket.on("recieveAllMessage", (data) => {
         console.log(data);
        setMessages(data);
    })

    const messageHelper = (messages) => {
        let obj = {};

        for(let i=0;i<messages.length;i++) {
            obj[messages[i]._id] = messages[i];
        }
        let _messages = [];
        for(let i in obj) {
            _messages.push(obj[i]);
        }
        return _messages;
    }

    socket.on("recieveMessage", (data) => {
        
        if(currentUser && currentUser.username == data.senderId) {
            const _messages = messages;
            _messages.push(data);
            setMessages(messageHelper(_messages));
        }
    })

    socket.on("recieveFile", (data) => {
        if(currentUser && currentUser.username == data.senderId) {
            const _messages = messages;
            _messages.push(data);
            setMessages(messageHelper(_messages));
        }
    })

    useEffect(() => {
    if(user) onUserAuthenticated();
    }, [user])

    useEffect(() => {
        const div = divUnderMessage.current;
    if (div) {
      div.scrollIntoView({behavior:'smooth', block:'end'});
    }
    },[messages])



  return (
    <div className='home'>
        <div className='home-sidebar'>
            <User />
            <Contacts contacts={contacts} setCurrentUser={setCurrentUser} socket={socket}/>
            {
                currentUser && (currentUser.username)
            }
        </div>
        <div className='home-conversation'>
            <div className='conversation-user'>
                <p>Conversation</p>
                <div className='conversation-user-info'>
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"></img>
                    <p>{currentUser && currentUser.username}</p>
                </div>
            </div>
            <div className='chat'>
                <div className='chat-center'>
                    {
                        messages.map(message => {
                            const {_id, senderId, recieverId, text, imageUrl} = message;
                           return <Message key={_id} id={(senderId == user.username) ? 1 : 2} recieverId={recieverId} text={text} imageUrl={imageUrl}/>
                        })
                    }
                    <div ref={divUnderMessage}></div>
                </div>
                
                <Form socket={socket} currentUser={currentUser} messages={messages} setMessages={setMessages}/>
            </div>
        </div>
    </div>
  )
}

export default HomePage