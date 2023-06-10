import React from 'react'
import { Navigate } from 'react-router-dom'

function Proutes({user, children}) {
  if(!user) {
    return <Navigate to="/register" replace/>
  }
  return children;
}

export default Proutes