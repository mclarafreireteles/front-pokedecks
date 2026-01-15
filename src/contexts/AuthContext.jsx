import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('pokedecks_token');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('pokedecks_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      const decodedUser = jwtDecode(data.token);

      setToken(data.token);
      setUser(decodedUser);
      localStorage.setItem('pokedecks_token', data.token);

      // Redirect to dashboard if admin, otherwise to marketplace
      if (decodedUser.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/marketplace');
      }
    } catch (error) {
      console.error('Failed to login:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('pokedecks_token');

    navigate('/');
  };
  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
