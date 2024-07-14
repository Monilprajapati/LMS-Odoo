import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {

  const { isAuth } = useUserContext()

  return !isAuth ? children  : <Navigate to="/" />
}

export default PublicRoute
