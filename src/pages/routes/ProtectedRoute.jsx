import React from "react";
import { Outlet, Navigate } from 'react-router-dom';

export const name = React.createContext("")

const ProtectedRoute = () => {

  const AuthToken = sessionStorage.getItem('jwt');

  return AuthToken !== null && AuthToken !== 'undefind' ? <Outlet/> : <Navigate to="/loginform" />;
};

export default ProtectedRoute;