import './registerform.style.css'

import { useState } from "react"
import { register } from "../../services/authService"

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { FiUser } from "react-icons/fi";
import { FiAtSign } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
        setSuccess(null);

        try {
            const registeredUser = await register(formData);

            setIsLoading(false);
            setSuccess(`Usuário ${registeredUser.username} registrado com sucesso!`);

            setFormData({ name: '', username: '', email: '', password: '' });
            navigate('/register/success');
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formregister'>
            <div className="formregister-container-input">
                <Input 
                    icon={FiUser} 
                    id="name" 
                    placeholder="Full name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    type="text" 
                    required0
                />
                <Input 
                    icon={FiAtSign} 
                    id="username" 
                    placeholder="Username" 
                    name="username" 
                    type="text" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
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

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrar'}
            </Button>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}