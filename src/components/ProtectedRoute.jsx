import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const usuarioStored = localStorage.getItem('usuario');
  let usuario = null;

  if (usuarioStored) {
    try {
      usuario = JSON.parse(usuarioStored);
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }


  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }


  if (allowedRoles && !allowedRoles.includes(usuario.rol)) {

    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
