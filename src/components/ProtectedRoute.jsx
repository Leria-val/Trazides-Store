import React from 'react'
import { Navigate } from 'react-router-dom'

// Protects a route by checking the provided token or localStorage
export default function ProtectedRoute({ token, role, allowedRoles, children, redirectTo = '/login' }) {
  const current = token ?? localStorage.getItem('userToken')
  const currentRole = role ?? localStorage.getItem('userRole')

  // not authenticated
  if (!current) return <Navigate to={redirectTo} replace />

  // if allowedRoles is provided, check role match
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(currentRole)) {
      // not allowed — redirect to login page (or home)
      return <Navigate to={redirectTo} replace />
    }
  }

  return children
}
