import './loginform.style.css';

import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

import { FiMail } from 'react-icons/fi';
import { FiLock } from 'react-icons/fi';

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      // O redirecionamento é feito automaticamente pelo AuthContext
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formlogin">
      <div className="formlogin-container-input">
        <Input
          icon={FiMail}
          id="email"
          placeholder="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          icon={FiLock}
          id="password"
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <Button typeColor="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign In'}
      </Button>

      {error && <p className="formlogin-error">{error}</p>}
    </form>
  );
}
