import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute: React.FC = () => {
  const isAuthenticated = false // replace with real auth check

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute
