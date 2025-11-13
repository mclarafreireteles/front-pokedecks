import './loginform.style.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';


import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

export function LoginForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await login(formData.email, formData.password);

            // setIsLoading(false);
            console.log('Login bem-sucedido!', data);

            if (data.token) {
                localStorage.setItem('authToken', data.token);
                navigate('/marketplace');
            } else {
                setError('Token não recebido do servidor.');
            }

        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formlogin'>
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

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};