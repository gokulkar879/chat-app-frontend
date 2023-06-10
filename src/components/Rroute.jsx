import React from 'react'
import { Navigate } from 'react-router-dom'

function Rroutes({user, children}) {
  if(user) {
    return <Navigate to="/" replace/>
  }
  return children;
}

export default Rroutes