import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAdminCheck from '../../hooks/useAdminCheck';
import NavBar from './NavBar';
import Loading from '../../utils/Loading';

const Dashboard = () => {
  const { isAdmin, loading } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform navigation if user is not an admin
    if (!isAdmin && !loading) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) return <Loading />;

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
