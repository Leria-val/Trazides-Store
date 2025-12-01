import React from 'react'
import { Navigate } from 'react-router-dom'

// Protects a route by checking the provided token or localStorage
export default function ProtectedRoute({ token, children, redirectTo = '/login' }) {
  const current = token ?? localStorage.getItem('userToken')
  if (!current) return <Navigate to={redirectTo} replace />
  return children
}
