import { Outlet, Navigate } from "react-router-dom";
import React from 'react';

const GuestRoutes = ({ component: Component, isAuthenticated, ...rest }: any) => {
  return isAuthenticated ? <Navigate to="/" /> : <Outlet /> ;
};

export default GuestRoutes;
