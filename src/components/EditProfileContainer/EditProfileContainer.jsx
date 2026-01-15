import './editprofilecontainer.style.css';

import { useState, useEffect } from 'react';

import * as userService from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

import { FiTrash } from 'react-icons/fi';
import { FiSave } from 'react-icons/fi';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Box, CircularProgress, Typography, Button as MuiButton } from '@mui/material';

export function EditProfileContainer() {
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    id: '',
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await userService.getUserProfile();
        setFormData(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await userService.updateUserProfile(formData.id, formData);
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error(error);
      setError(error.message);
      showNotification('Error saving profile: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')
    ) {
      setIsLoading(true);
      setError(null);

      try {
        await userService.deleteUserProfile(formData.id);
        showNotification('Profile deleted successfully.', 'success');
        logout();
      } catch (error) {
        console.error(error);
        setError(error.message);
        showNotification('Error deleting profile: ' + error.message, 'error');
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <MuiButton variant="contained" onClick={() => window.location.reload()}>
          Try Again
        </MuiButton>
      </Box>
    );
  }

  return (
    <form action="">
      <div className="input-container">
        <div className="input-container-label">
          <h3 className="label-input">Username</h3>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            readOnly={true}
          />
        </div>
        <div className="input-container-label">
          <h3 className="label-input">Full name</h3>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
          />
        </div>
        <div className="input-container-label">
          <h3 className="label-input">E-mail</h3>
          <Input
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={true}
          />
        </div>
        <div className="input-container-label">
          <h3 className="label-input">Phone number</h3>
          <Input
            placeholder="Phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="input-container-label">
          <h3 className="label-input">Date of birth</h3>
          <Input
            placeholder="Date of Birth"
            value={formData.birthDate}
            name="birthDate"
            type="date"
            onChange={handleChange}
          />
        </div>
        <div className="input-container-label">
          <h3 className="label-input">Address</h3>
          <Input
            placeholder="Address"
            value={formData.address}
            name="address"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="btn-container">
        <Button icon={FiTrash} typeColor="danger" type="button" onClick={handleDelete}>
          Delete profile
        </Button>
        <Button icon={FiSave} typeColor="primary" type="submit" onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
