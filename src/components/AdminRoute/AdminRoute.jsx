import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import * as userService from '../../services/userService';

export function AdminRoute() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminRole() {
      if (!authLoading && isAuthenticated) {
        try {
          // Fetch user profile to get role since JWT doesn't include it
          const profileData = await userService.getUserProfile();
          setIsAdmin(profileData.role === 'ADMIN');
        } catch (error) {
          console.error('Error checking admin permissions:', error);
          setIsAdmin(false);
        } finally {
          setIsChecking(false);
        }
      } else if (!authLoading) {
        setIsChecking(false);
      }
    }

    checkAdminRole();
  }, [authLoading, isAuthenticated]);

  if (authLoading || isChecking) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
