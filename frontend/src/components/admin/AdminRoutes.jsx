import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const userInfo = useSelector((state) => state.admin.admin);
  console.log('userInfo :',userInfo)
  return userInfo ? <Outlet /> : <Navigate to={'/admin/login'} replace />
}

export default AdminRoutes