import './editprofilecontainer.style.css'

import { useState, useEffect } from 'react';

import { FiTrash } from 'react-icons/fi';
import { FiSave } from "react-icons/fi";


import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export function EditProfileContainer() {

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const token = localStorage.getItem('pokedecks_token');

                if (!token) {
                    throw new Error('usuário nao autenticado faça o login')
                }

                const response = await fetch('https://pokedecks-backend-with-spring.onrender.com/api/users/me', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do usuário')
                }

                const data = await response.json();

                setFormData(data);

            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSave = (e) => {
        e.preventDefault(); 
        console.log("Dados para salvar:", formData);
        // Aqui você chamaria sua API de "UPDATE" (ex: PUT /api/users/me)
        alert("Dados salvos (simulação)!");
    };

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir seu perfil?")) {
            console.log("Excluindo perfil...");
            // Aqui você chamaria sua API de "DELETE" (ex: DELETE /api/users/me)
            alert("Perfil excluído (simulação)!");
        }
    };

    if (isLoading) {
        return <div>Carregando perfil</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
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
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Full name</h3>
                    <Input 
                        name="fullname"
                        value={formData.fullname}
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
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Phone number</h3>
                    <Input 
                        placeholder="Phone number" 
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Date of birth</h3>
                    <Input 
                        placeholder="Date of Birth"
                        value={formData.dateOfBirth} 
                        name="dateofbirth"
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
                <Button 
                    icon={FiTrash} 
                    typeColor="danger"
                    type="button"
                    onClick={handleDelete}
                >
                    Delete profile
                </Button>
                <Button 
                    icon={FiSave} 
                    typeColor="primary"
                    type="submit"
                    onClick={handleSave}
                >
                    Save changes
                </Button>
            </div>
        </form>
    )
}