import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

import { getUserProfile } from '../../services/userService';

export function AdminRoute() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated) {
            setIsRoleLoading(false);
            return;
        }

        async function checkAdminStatus() {
            try {
                const profileData = await getUserProfile();
                
                console.log("Perfil buscado na rota admin:", profileData);

                if (profileData.role === 'ADMIN') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Erro ao verificar permissão de admin:", error);
                setIsAdmin(false); 
            } finally {
                setIsRoleLoading(false); 
            }
        }

        checkAdminStatus();

    }, [isAuthenticated, authLoading]);


    if (authLoading || isRoleLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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