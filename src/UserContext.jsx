import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        console.log('p');
        fetch('https://chat-app-backend-3kda.onrender.com',{
            credentials: 'include'
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            setUser(data.user);
          }).catch(err => {
            console.log(err);
          })
    }, [])

    return <UserContext.Provider value={{
        user,
        setUser
    }}>
        {
            children
        }
    </UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext);
}

export default UserProvider;